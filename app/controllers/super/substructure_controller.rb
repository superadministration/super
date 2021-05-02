# frozen_string_literal: true

module Super
  # Various methods that determine the behavior of your controllers. These
  # methods can and should be overridden.
  class SubstructureController < ActionController::Base
    private

    helper_method def model
      raise NotImplementedError
    end

    # This is an optional method
    #
    # @return [String]
    helper_method def title
      model.name.pluralize
    end

    # Configures what database records are visible on load. This is an optional
    # method, it defaults to "`all`" methods
    #
    # @return [ActiveRecord::Relation]
    helper_method def scope
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
      strong_params = Super::Form::StrongParams.new(form_schema)
      params.require(strong_params.require(model)).permit(strong_params.permit)
    end

    # Configures the actions linked to on the index page. This is an optional
    # method
    #
    # @return [Array<Link>]
    helper_method def collection_actions
      Super::Link.find_all(:new)
    end

    # Configures the actions linked to on the show page as well as each row of
    # the table on the index page. This is an optional method
    #
    # @return [Array<Link>]
    helper_method def member_actions
      if current_action.show?
        Super::Link.find_all(:edit, :destroy)
      elsif current_action.edit?
        Super::Link.find_all(:show, :destroy)
      else
        Super::Link.find_all(:show, :edit, :destroy)
      end
    end

    helper_method def navigation
      Super::Navigation.new(&:all)
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

    def load_records
      scope
    end

    def load_record
      scope.find(params[:id])
    end

    def build_record
      scope.build
    end

    def build_record_with_params
      scope.build(permitted_params)
    end

    def save_record
      @record.save
    end

    def update_record
      @record.update(permitted_params)
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
      @records
        .limit(@pagination.limit)
        .offset(@pagination.offset)
    end

    def index_view
      Super::Layout.new(
        mains: [
          Super::Panel.new(
            Super::Partial.new("collection_header"),
            :@display
          ),
        ],
        asides: [
          :@query_form,
        ]
      )
    end

    def show_view
      Super::Layout.new(
        mains: [
          Super::Panel.new(
            Super::Partial.new("member_header"),
            :@display
          ),
        ]
      )
    end

    def new_view
      Super::Layout.new(
        mains: [
          Super::Panel.new(
            Super::Partial.new("collection_header"),
            :@form
          ),
        ]
      )
    end

    def edit_view
      Super::Layout.new(
        mains: [
          Super::Panel.new(
            Super::Partial.new("member_header"),
            :@form
          ),
        ]
      )
    end
  end
end
