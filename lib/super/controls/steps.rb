module Super
  class Controls
    # Methods that are called by controller actions. All of these methods have
    # a default implementation, but feel free to override as needed.
    module Steps
      # Tells the controller how to load records in the index action using
      # `#scope`
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Relation]
      def load_records(action:, params:)
        default_for(:load_records, action: action, params: params) do
          scope(action: action)
        end
      end

      # Sets up pagination
      #
      # @param action [ActionInquirer]
      # @param records [ActiveRecord::Relation]
      # @param query_params [Hash]
      # @return [Pagination]
      def initialize_pagination(action:, records:, query_params:)
        default_for(:initialize_pagination, action: action, records: records, query_params: query_params) do
          Pagination.new(
            total_count: records.size,
            limit: records_per_page(action: action, query_params: query_params),
            query_params: query_params,
            page_query_param: :page
          )
        end
      end

      # Paginates
      #
      # @param action [ActionInquirer]
      # @param records [ActiveRecord::Relation]
      # @param pagination [Pagination]
      # @return [ActiveRecord::Relation]
      def paginate_records(action:, records:, pagination:)
        default_for(:paginate_records, action: action, records: records, pagination: pagination) do
          records
            .limit(pagination.limit)
            .offset(pagination.offset)
        end
      end

      # Loads a record using `#scope`
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base]
      def load_record(action:, params:)
        default_for(:load_record, action: action, params: params) do
          scope(action: action).find(params[:id])
        end
      end

      # Builds a record using `#scope`
      #
      # @param action [ActionInquirer]
      # @return [ActiveRecord::Base]
      def build_record(action:)
        default_for(:build_record) do
          scope(action: action).build
        end
      end

      # Builds and populates a record using `#scope`
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base]
      def build_record_with_params(action:, params:)
        default_for(:build_record_with_params, action: action, params: params) do
          scope(action: action).build(permitted_params(params, action: action))
        end
      end

      # Saves a record
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base]
      def save_record(action:, record:, params:)
        default_for(:save_record, action: action, record: record, params: params) do
          record.save
        end
      end

      # Saves a record
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base]
      def update_record(action:, record:, params:)
        default_for(:update_record, action: action, record: record, params: params) do
          record.update(permitted_params(params, action: action))
        end
      end

      # Destroys a record
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base, false]
      def destroy_record(action:, record:, params:)
        default_for(:update_record, action: action, record: record, params: params) do
          record.destroy
        end
      end
    end
  end
end
