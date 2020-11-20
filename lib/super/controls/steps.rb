module Super
  class Controls
    module Steps
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
      # @param pagination [Pagination]
      # @return [ActiveRecord::Relation]
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
    end
  end
end
