# frozen_string_literal: true

module Super
  # These methods determine the behavior of your resourceful Super controllers.
  # These methods can and should be overridden.
  class SubstructureController < FoundationController
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
      nil
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

    # @return [Boolean]
    helper_method def filters_enabled?
      true
    end

    # @return [Super::Filter]
    helper_method def filter_schema
      Super::Filter.new do |fields, type|
        Super::Filter::Guesser.new(model: model, fields: fields, type: type).call
      end
    end

    # @return [Boolean]
    helper_method def sort_enabled?
      true
    end

    helper_method def sortable_columns
      attribute_names =
        display_schema.each_attribute.map do |key, val|
          val = val.build if val.respond_to?(:build)
          key if val.real?
        end

      attribute_names.compact
    end

    helper_method def default_sort
      {id: :desc}
    end

    # Specifies how many records to show per page
    #
    # @return [Integer]
    helper_method def records_per_page
      Super.configuration.index_records_per_page
    end

    # @return [Boolean]
    helper_method def batch_actions_enabled?
      true
    end

    helper_method def batch_actions
      []
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

    # @return [void]
    def set_record_attributes
      @record.attributes = permitted_params
    end

    def save_record
      @record.save
    end

    def destroy_record
      @record.destroy
    end

    # @return [Super::Query]
    helper_method def query
      @query ||= Super::Query.new(
        model: model,
        params: request.GET,
        current_path: request.path
      )
    end

    # @return [ActiveRecord::Relation]
    def apply_queries
      query.apply_changes(@records)
    end

    # @return [Super::Filter::FormObject, nil]
    def initialize_filter_form
      if filters_enabled?
        @filter_form = query.build(
          Super::Filter::FormObject,
          namespace: :f,
          schema: filter_schema
        )
      end
    end

    # @return [Super::Sort::FormObject, nil]
    def initialize_sort_form
      if sort_enabled?
        @sort_form = query.build(
          Super::Sort::FormObject,
          namespace: :s,
          default: default_sort,
          sortable_columns: sortable_columns
        )
      end
    end

    # @return [Symbol, String]
    helper_method def pagination_disabled_param
      :_all_pages
    end

    # @return [Boolean]
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

    # @return [Boolean]
    helper_method def csv_enabled?
      true
    end

    helper_method def resolved_member_actions(record)
      member_actions(record).map do |action|
        if action.respond_to?(:resolve)
          resolve_member_action(action, record)
        else
          action
        end
      end
    end

    helper_method def resolved_collection_actions
      collection_actions.map do |action|
        if action.respond_to?(:resolve)
          resolve_collection_action(action)
        else
          action
        end
      end
    end
  end
end
