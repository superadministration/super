module Super
  # A wrapper around the per-controller Controls classes. This class often
  # directly delegates to the per-controller classes, but it can also provide
  # some default implementation.
  class Controls
    def initialize(actual)
      @actual = actual
    end

    attr_reader :actual

    # This is an optional method
    #
    # @return [String]
    def title
      default_for(:title) do
        model.name.pluralize
      end
    end

    # Specifies the model. This is a required method
    #
    # @return [ActiveRecord::Base]
    def model
      @actual.model
    end

    # Configures the actions linked to on the index page. This is an optional
    # method
    #
    # @param params [ActionController::Parameters]
    # @param action [ActionInquirer]
    # @return [Array<Link>]
    def resources_actions(params:, action:)
      actions =
        if @actual.respond_to?(:resources_actions)
          @actual.resources_actions(params: params, action: action)
        else
          [:new]
        end

      actions.map do |link|
        link = Link.resolve(link)

        link.call(params: params)
      end
    end

    # Configures the actions linked to on the show page as well as each row of
    # the table on the index page. This is an optional method
    #
    # @param resource [ActiveRecord::Base]
    # @param params [ActionController::Parameters]
    # @param action [ActionInquirer]
    # @return [Array<Link>]
    def resource_actions(resource, params:, action:)
      actions =
        if @actual.respond_to?(:resource_actions)
          @actual.resource_actions(resource, params: params, action: action)
        else
          if action.show?
            [:edit, :destroy]
          elsif action.edit?
            [:show, :destroy]
          else
            [:show, :edit, :destroy]
          end
        end

      actions.map do |link|
        link = Link.resolve(link)

        link.call(resource, params: params)
      end
    end

    # Configures what database records are visible on load. This is an optional
    # method, it defaults to "`all`" methods
    #
    # @param action [ActionInquirer]
    # @return [ActiveRecord::Relation]
    def scope(action:)
      default_for(:scope, action: action) do
        model.all
      end
    end

    # Configures which parameters could be written to the database. This is a
    # required method
    #
    # @param params [ActionController::Parameters]
    # @param action [ActionInquirer]
    # @return [ActionController::Parameters]
    def permitted_params(params, action:)
      @actual.permitted_params(params, action: action)
    end

    # Configures the fields that are displayed on the index and show actions.
    # This is a required method
    #
    # @param action [ActionInquirer]
    # @return [Schema]
    def display_schema(action:)
      @actual.display_schema(action: action)
    end

    # Configures the editable fields on the new and edit actions. This is a
    # required method
    #
    # @param action [ActionInquirer]
    # @return [Schema]
    def form_schema(action:)
      @actual.form_schema(action: action)
    end

    # Tells the controller how to load resources in the index action using
    # `#scope`
    #
    # @param action [ActionInquirer]
    # @param params [ActionController::Parameters]
    # @return [ActiveRecord::Relation]
    def load_resources(action:, params:)
      default_for(:load_resources, action: action, params: params) do
        scope(action: action)
      end
    end

    # Specifies how many resources to show per page
    #
    # @param action [ActionInquirer]
    # @param query_params [Hash]
    # @return [ActiveRecord::Relation]
    def resources_per_page(action:, query_params:)
      default_for(:resources_per_page, action: action, query_params: query_params) do
        Super.configuration.index_resources_per_page
      end
    end

    # Sets up pagination
    #
    # @param action [ActionInquirer]
    # @param resources [ActiveRecord::Relation]
    # @param query_params [Hash]
    # @return [Pagination]
    def initialize_pagination(action:, resources:, query_params:)
      default_for(:initialize_pagination, action: action, resources: resources, query_params: query_params) do
        Pagination.new(
          total_count: resources.size,
          limit: resources_per_page(action: action, query_params: query_params),
          query_params: query_params,
          page_query_param: :page
        )
      end
    end

    # Paginates
    #
    # @param action [ActionInquirer]
    # @param resources [ActiveRecord::Relation]
    # @param query_params [Hash]
    # @return [Pagination]
    def paginate_resources(action:, resources:, pagination:)
      default_for(:paginate_resources, action: action, resources: resources, pagination: pagination) do
        resources
          .limit(pagination.limit)
          .offset(pagination.offset)
      end
    end

    # Loads a resource using `#scope`
    #
    # @param action [ActionInquirer]
    # @param params [ActionController::Parameters]
    # @return [ActiveRecord::Base]
    def load_resource(action:, params:)
      default_for(:load_resource, action: action, params: params) do
        scope(action: action).find(params[:id])
      end
    end

    # Builds a resource using `#scope`
    #
    # @param action [ActionInquirer]
    # @return [ActiveRecord::Base]
    def build_resource(action:)
      default_for(:build_resource) do
        scope(action: action).build
      end
    end

    # Builds and populates a resource using `#scope`
    #
    # @param action [ActionInquirer]
    # @param params [ActionController::Parameters]
    # @return [ActiveRecord::Base]
    def build_resource_with_params(action:, params:)
      default_for(:build_resource_with_params, action: action, params: params) do
        scope(action: action).build(permitted_params(params, action: action))
      end
    end

    # Saves a resource
    #
    # @param action [ActionInquirer]
    # @param params [ActionController::Parameters]
    # @return [ActiveRecord::Base]
    def save_resource(action:, resource:, params:)
      default_for(:save_resource, action: action, resource: resource, params: params) do
        resource.save
      end
    end

    # Saves a resource
    #
    # @param action [ActionInquirer]
    # @param params [ActionController::Parameters]
    # @return [ActiveRecord::Base]
    def update_resource(action:, resource:, params:)
      default_for(:update_resource, action: action, resource: resource, params: params) do
        resource.update(permitted_params(params, action: action))
      end
    end

    # Destroys a resource
    #
    # @param action [ActionInquirer]
    # @param params [ActionController::Parameters]
    # @return [ActiveRecord::Base, false]
    def destroy_resource(action:, resource:, params:)
      default_for(:update_resource, action: action, resource: resource, params: params) do
        resource.destroy
      end
    end

    private

    def default_for(method_name, *args, **kwargs)
      if @actual.respond_to?(method_name)
        if args.empty? && kwargs.empty?
          return @actual.public_send(method_name)
        elsif args.empty?
          return @actual.public_send(method_name, **kwargs)
        else
          return @actual.public_send(method_name, *args)
        end
      end

      yield
    end
  end
end
