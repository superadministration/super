# frozen_string_literal: true

module Super
  class Form
    # Holds a recording of a form field definition
    class FieldTranscript
      def initialize
        @super = false
      end

      attr_reader :method_name
      attr_reader :args
      attr_reader :kwargs

      def super
        @super = true
        self
      end

      def super?
        @super
      end

      def method_missing(new_method_name, *args, **kwargs)
        if @method_name.present?
          method_chain =
            if super?
              "super.#{@method_name}"
            else
              @method_name.to_s
            end

          raise Error::AlreadyTranscribed, "This instance already holds a transcription for: #{method_chain}"
        end

        @method_name = new_method_name
        @args = args
        @kwargs = kwargs
        @method_name
      end
    end
  end
end
