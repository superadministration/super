# frozen_string_literal: true

module Super
  class Filter
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
          .call
      end

      private

      def attribute_type_for(attribute_name)
        type = @model.type_for_attribute(attribute_name).type
        case type
        when :datetime
          @type.timestamp
        when :boolean
          @type.boolean
        else
          @type.text
        end
      end
    end
  end
end
