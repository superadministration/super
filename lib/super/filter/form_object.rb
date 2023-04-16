# frozen_string_literal: true

module Super
  class Filter
    class FormObject
      class AttributeForm
        def initialize(model:, field_name:, operators:, params:)
          @model = model
          @field_name = field_name
          @operators = operators
          @params = params || {}
        end

        attr_reader :model
        attr_reader :field_name
        attr_reader :operators
        attr_reader :params

        def each_operator
          return enum_for(:each_operator) if !block_given?

          @operators.each do |operator|
            operator_form = OperatorForm.new(
              operator: operator,
              params: @params[operator.identifier]
            )

            yield(operator_form)
          end
        end

        def humanized_attribute_name
          @model.human_attribute_name(@field_name)
        end
      end

      class OperatorForm
        NULLARY = :_apply

        def initialize(operator:, params:)
          @operator = operator
          @params = params || {}
          query_parameter_keys = operator.query_parameter_keys
          query_parameter_keys = [NULLARY] if query_parameter_keys.empty?
          @specified_values =
            query_parameter_keys
              .map { |key| [key, @params[key].presence&.strip] }
              .to_h

          @specified_values.each do |key, value|
            define_singleton_method(key) { value }
          end
        end

        def specified?
          @specified_values.any? { |_key, value| value }
        end

        attr_reader :operator
        attr_reader :specified_values

        def identifier
          @operator.identifier
        end

        def each_field
          return enum_for(:each_field) if !block_given?

          @specified_values.each do |key, _value|
            yield(key)
          end
        end
      end

      def initialize(model:, params:, schema:)
        @model = model
        @params = params || {}
        @schema = schema

        @form_fields = {}
      end

      def each_attribute
        return enum_for(:each_attribute) if !block_given?

        @schema.fields.each do |field_name, field_operators|
          attribute_form = AttributeForm.new(
            model: @model,
            field_name: field_name,
            operators: field_operators,
            params: @params[field_name]
          )

          yield(attribute_form)
        end
      end

      def to_partial_path
        "filter"
      end

      def apply_changes(relation)
        each_attribute do |attribute_form|
          attribute_form.each_operator do |operator_form|
            next if operator_form.specified_values.values.map(&:to_s).map(&:presence).none?

            operator_behavior = operator_form.operator.behavior
            updated_relation = operator_behavior.call(relation, attribute_form.field_name, **operator_form.specified_values)

            if updated_relation.is_a?(ActiveRecord::Relation)
              relation = updated_relation
            end
          end
        end

        relation
      end
    end
  end
end
