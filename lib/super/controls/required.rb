module Super
  class Controls
    # Methods for `Controls` that must be defined for Super to work properly
    module Required
      # Specifies the model. This is a required method
      #
      # @return [ActiveRecord::Base]
      def model
        raise NotImplementedError
      end
    end
  end
end
