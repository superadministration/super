# frozen_string_literal: true

module Super
  class Filter
    class FormObject
      class FilterFormField
        def initialize(humanized_field_name:, field_name:, type:, params:)
          @humanized_field_name = humanized_field_name
          @field_name = field_name
          @field_type = type
          @params = params
          @specified_values =
            type.q
              .map do |query_field_name|
                [
                  query_field_name,
                  (params || {})[query_field_name],
                ]
              end
              .to_h

          @specified_values.each do |key, value|
            define_singleton_method(key) { value }
          end
        end

        attr_reader :humanized_field_name
        attr_reader :field_name
        attr_reader :field_type
        attr_reader :specified_values

        def op
          (@params || {})[:op]
        end

        def operators
          @field_type.operators
            .map { |o| [o.name, o.identifier] }
            .to_h
        end

        def to_partial_path
          @field_type.to_partial_path
        end
      end

      def initialize(model:, url:, schema:, params:)
        @model = model
        @url = url
        @schema = schema
        @params = params

        @form_fields = {}
      end

      def each_field
        @schema.fields.each do |field_name, _field_type|
          yield(form_field_for(field_name))
        end
      end

      def url
        @url
      end

      def to_partial_path
        "filter"
      end

      def to_search_query(relation)
        each_field do |form_field|
          next if form_field.specified_values.values.map(&:to_s).map(&:strip).all? { |specified_value| specified_value == "" }
          next if !Super::Filter::Operator.registry.key?(form_field.op)

          operator = Super::Filter::Operator.registry[form_field.op]
          updated_relation = operator.filter(relation, form_field.field_name, *form_field.specified_values.values)

          if updated_relation.is_a?(ActiveRecord::Relation)
            relation = updated_relation
          end
        end

        relation
      end

      private

      def form_field_for(field_name)
        @form_fields[field_name] ||=
          FilterFormField.new(
            humanized_field_name: @model.human_attribute_name(field_name),
            field_name: field_name,
            type: @schema.fields[field_name],
            params: (@params || {})[field_name]
          )
      end
    end
  end
end
