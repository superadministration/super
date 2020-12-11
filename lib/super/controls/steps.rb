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

      def build_index_view
        Super::Layout.new(
          mains: [
            Super::Panel.new(
              Super::Partial.new("collection_header"),
              :@display
            ),
          ]
        )
      end

      def build_show_view
        Super::Layout.new(
          mains: [
            Super::Panel.new(
              Super::Partial.new("member_header"),
              :@display
            ),
          ]
        )
      end

      def build_new_view
        Super::Layout.new(
          mains: [
            Super::Panel.new(
              Super::Partial.new("collection_header"),
              :@form
            ),
          ]
        )
      end

      def build_edit_view
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
end
