# frozen_string_literal: true

module Super
  class Display
    class Guesser
      def initialize(model:, action:, fields:, type:)
        @model = model
        @action_inquirer = action
        @fields = fields
        @type = type
      end

      def call
        Schema::Guesser
          .new(model: @model, fields: @fields, type: @type)
          .ignore_foreign_keys
          .limit { 5 if @action_inquirer.index? }
          .assign_type { |attribute_name| attribute_type_for(attribute_name) }
          .call
      end

      private

      def attribute_type_for(attribute_name)
        type = @model.type_for_attribute(attribute_name).type

        case type
        when :datetime
          @type.timestamp
        when :time
          @type.time
        else
          @type.text
        end
      end
    end
  end
end
