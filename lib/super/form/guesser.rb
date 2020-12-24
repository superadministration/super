module Super
  class Form
    class Guesser
      def initialize(model:, fields:, type:)
        @model = model
        @fields = fields
        @type = type
      end

      def call
        Schema::Guesser
          .new(model: @model, fields: @fields, type: @type)
          .assign_type { |attribute_name| attribute_type_for(attribute_name) }
          .reject { |attribute_name| attribute_name == "id" }
          .reject { |attribute_name| attribute_name == "created_at" }
          .reject { |attribute_name| attribute_name == "updated_at" }
          .call
      end

      private

      def attribute_type_for(attribute_name)
        @type.string
      end
    end
  end
end
