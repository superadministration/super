# frozen_string_literal: true

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
        scope(action: action)
      end

      # Loads a record using `#scope`
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base]
      def load_record(action:, params:)
        scope(action: action).find(params[:id])
      end

      # Builds a record using `#scope`
      #
      # @param action [ActionInquirer]
      # @return [ActiveRecord::Base]
      def build_record(action:)
        scope(action: action).build
      end

      # Builds and populates a record using `#scope`
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base]
      def build_record_with_params(action:, params:)
        scope(action: action).build(permitted_params(params, action: action))
      end

      # Saves a record
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [true, false]
      def save_record(action:, record:, params:)
        record.save
      end

      # Saves a record
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [true, false]
      def update_record(action:, record:, params:)
        record.update(permitted_params(params, action: action))
      end

      # Destroys a record
      #
      # @param action [ActionInquirer]
      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base, false]
      def destroy_record(action:, record:, params:)
        record.destroy
      end

      def initialize_query_form(params:, current_path:)
        Super::Query::FormObject.new(
          model: model,
          params: params,
          namespace: :q,
          current_path: current_path,
        )
      end

      def apply_queries(query_form:, records:)
        query_form.apply_changes(records)
      end

      def initialize_filter_form(query_form:)
        if filters_enabled?
          query_form.add(
            Super::Filter::FormObject,
            namespace: :f,
            schema: filter_schema
          )
        end
      end

      def initialize_sort_form(query_form:)
        if sort_enabled?
          query_form.add(
            Super::Sort::FormObject,
            namespace: :s,
            default: default_sort,
            sortable_columns: sortable_columns
          )
        end
      end

      # Sets up pagination
      #
      # @param action [ActionInquirer]
      # @param records [ActiveRecord::Relation]
      # @param query_params [Hash]
      # @return [Pagination]
      def initialize_pagination(action:, records:, query_params:)
        Pagination.new(
          total_count: records.size,
          limit: records_per_page(action: action, query_params: query_params),
          query_params: query_params,
          page_query_param: :page
        )
      end

      # Paginates
      #
      # @param action [ActionInquirer]
      # @param records [ActiveRecord::Relation]
      # @param pagination [Pagination]
      # @return [ActiveRecord::Relation]
      def paginate_records(action:, records:, pagination:)
        records
          .limit(pagination.limit)
          .offset(pagination.offset)
      end
    end
  end
end
