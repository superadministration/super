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
    end
  end
end
