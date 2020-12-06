module Super
  class Controls
    # Methods for `Controls` that must be defined for Super to work properly
    module Required
      # Specifies the model. This is a required method
      #
      # @return [ActiveRecord::Base]
      def model
        @actual.model
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
    end
  end
end
