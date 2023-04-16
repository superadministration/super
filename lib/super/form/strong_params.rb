# frozen_string_literal: true

module Super
  class Form
    class StrongParams
      def initialize(form_schema)
        @form_schema = form_schema
      end

      def require(model)
        model.model_name.singular
      end

      def permit
        unfurl(@form_schema)
      end

      private

      def unfurl(responds_to_each_attribute)
        responds_to_each_attribute.each_attribute.map do |name, type|
          if type.nested_fields&.any?
            {name => [:id, *unfurl(type)]}
          else
            name
          end
        end
      end
    end
  end
end
