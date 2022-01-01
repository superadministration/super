# frozen_string_literal: true

module Super
  # Various methods that determine the behavior of your controllers. These
  # methods can and should be overridden.
  class SubstructureController < ActionController::Base
    def self.batch(action_name)
      mod = Module.new do
        define_method(action_name) do
          if !params[:batch]
            flash.alert = I18n.t("super.batch.none_error")
            return render :nothing, status: :bad_request
          end

          super()
        end
      end

      const_set("Batch__#{action_name}__#{SecureRandom.hex(4)}", mod)
      prepend(mod)

      action_name
    end

    private

    helper_method def model
      raise Error::NotImplementedError
    end

    # This is an optional method
    #
    # @return [String]
    helper_method def title
      model.name.pluralize
    end

    # This defines what to set in the <title> tag. It works in conjunction with
    # the `#site_title` method
    #
    # @return [String, void]
    helper_method def page_title
      model.name.pluralize
    rescue Error::NotImplementedError, NameError
      return nil
    end

    # Configures what database records are visible on load. This is an optional
    # method, it defaults to "`all`" methods
    #
    # @return [ActiveRecord::Relation]
    helper_method def base_scope
      model.all
    end

    # Configures the fields that are displayed on the index and show actions.
    # This is a required method
    #
    # @return [Display]
    helper_method def display_schema
      Display.new do |fields, type|
        Display::Guesser.new(model: model, action: current_action, fields: fields, type: type).call
      end
    end

    # Configures the editable fields on the new and edit actions. This is a
    # required method
    #
    # @return [Form]
    helper_method def form_schema
      Form.new do |fields, type|
        Form::Guesser.new(model: model, fields: fields, type: type).call
      end
    end

    # Configures which parameters could be written to the database. This is a
    # required method
    #
    # @return [ActionController::Parameters]
    helper_method def permitted_params
      strong_params =
        if current_action.create?
          with_current_action("new") do
            Super::Form::StrongParams.new(form_schema)
          end
        elsif current_action.update?
          with_current_action("edit") do
            Super::Form::StrongParams.new(form_schema)
          end
        else
          Super::Form::StrongParams.new(form_schema)
        end
      params.require(strong_params.require(model)).permit(strong_params.permit)
    end

    helper_method def form_record(record)
      record
    end

    helper_method def form_action(record)
      Super::Link.polymorphic_parts(record)
    end

    # Configures the actions linked to on the index page. This is an optional
    # method
    #
    # @return [Array<Link>]
    helper_method def collection_actions
      if current_action.index?
        [
          Super::Partial.new("csv_button"),
          Super::Partial.new("batch_button"),
          Super::Link.find(:new)
        ]
      else
        Super::Link.find_all(:new)
      end
    end

    # Configures the actions linked to on the show page as well as each row of
    # the table on the index page. This is an optional method
    #
    # Favor the `record` argument over the `@record` instance variable;
    # `@record` won't always be set, notably on the index page where it's
    # called on every row
    #
    # @return [Array<Link>]
    helper_method def member_actions(record)
      if current_action.show?
        Super::Link.find_all(:edit, :destroy)
      elsif current_action.edit?
        Super::Link.find_all(:show, :destroy)
      else
        Super::Link.find_all(:show, :edit, :destroy)
      end
    end

    helper_method def resolve_collection_action(action)
      action.resolve(params: params)
    end

    helper_method def resolve_member_action(action, record)
      action.resolve(params: params, record: record)
    end

    helper_method def filters_enabled?
      true
    end

    helper_method def filter_schema
      Super::Filter.new do |fields, type|
        Super::Filter::Guesser.new(model: model, fields: fields, type: type).call
      end
    end

    helper_method def sort_enabled?
      true
    end

    helper_method def sortable_columns
      action = ActionInquirer.new(
        ActionInquirer.default_for_resources,
        "index"
      )
      attribute_names =
        display_schema.each_attribute.map do |key, val|
          val = val.build if val.respond_to?(:build)
          key if val.real?
        end

      attribute_names.compact
    end

    helper_method def default_sort
      { id: :desc }
    end

    # Specifies how many records to show per page
    #
    # @return [ActiveRecord::Relation]
    helper_method def records_per_page
      Super.configuration.index_records_per_page
    end

    helper_method def batch_actions_enabled?
      true
    end

    helper_method def batch_actions
      [
      ]
    end

    def load_records
      base_scope
    end

    def load_record
      base_scope.find(params[:id])
    end

    def build_record
      base_scope.build
    end

    def set_record_attributes
      @record.attributes = permitted_params
    end

    def save_record
      @record.save
    end

    def destroy_record
      @record.destroy
    end

    def initialize_query_form
      Super::Query::FormObject.new(
        model: model,
        params: params,
        namespace: :q,
        current_path: request.path,
      )
    end

    def apply_queries
      @query_form.apply_changes(@records)
    end

    def initialize_filter_form
      if filters_enabled?
        @query_form.add(
          Super::Filter::FormObject,
          namespace: :f,
          schema: filter_schema
        )
      end
    end

    def initialize_sort_form
      if sort_enabled?
        @query_form.add(
          Super::Sort::FormObject,
          namespace: :s,
          default: default_sort,
          sortable_columns: sortable_columns
        )
      end
    end

    helper_method def pagination_disabled_param
      :_all_pages
    end

    def pagination_enabled?
      !params.key?(pagination_disabled_param)
    end

    # Sets up pagination
    #
    # @return [Pagination]
    def initialize_pagination
      Pagination.new(
        total_count: @records.size,
        limit: records_per_page,
        query_params: request.GET,
        page_query_param: :page
      )
    end

    # Paginates
    #
    # @return [ActiveRecord::Relation]
    def paginate_records
      return @records if !pagination_enabled?

      @records
        .limit(@pagination.limit)
        .offset(@pagination.offset)
    end

    helper_method def paginated_link(page_query_params)
      polymorphic_path(
        Super::Link.polymorphic_parts(model),
        page_query_params
      )
    end

    helper_method def csv_enabled?
      true
    end

    def index_view
      Super::Layout.new(
        main: Super::ViewChain.new(
          main_panel: Super::Panel.new,
          batch_form: Super::Partial.new("batch_form"),
          main_header: Super::Partial.new("collection_header"),
          main: :@display
        ),
        aside: Super::ViewChain.new(
          main: :@query_form
        )
      )
    end

    def show_view
      Super::Layout.new(
        main: Super::ViewChain.new(
          main_panel: Super::Panel.new,
          main_header: Super::Partial.new("member_header"),
          main: :@display
        )
      )
    end

    def new_view
      Super::Layout.new(
        main: Super::ViewChain.new(
          main_panel: Super::Panel.new,
          main_header: Super::Partial.new("collection_header"),
          main: :@form
        )
      )
    end

    def edit_view
      Super::Layout.new(
        main: Super::ViewChain.new(
          main_panel: Super::Panel.new,
          main_header: Super::Partial.new("member_header"),
          main: :@form
        )
      )
    end

    concerning :Sitewide do
      included do
        helper_method :site_title
        helper_method :site_navigation
        helper_method :document_title
      end

      private

      def site_title
        Super.configuration.title
      end

      def site_navigation
        Super::Navigation.new(&:all)
      end

      def document_title
        if instance_variable_defined?(:@document_title)
          return @document_title
        end

        document_title_segments.map(&:presence).compact.join(document_title_separator)
      end

      def document_title_segments
        @document_title_segments ||= [page_title, site_title]
      end

      def document_title_separator
        @document_title_separator ||= " - "
      end
    end
  end
end
