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
    end
  end
end
