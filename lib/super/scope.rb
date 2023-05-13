# typed: true
# frozen_string_literal: true

module Super
  class Scope
    class Builder
      def initialize(fields)
        @fields = fields
      end
    end

    class FormObject
      def initialize(model:, params:, schema:)
        @model = model
        @params = params
        @schema = schema
      end

      def apply_changes(relation)
      end

      def to_partial_path
        "scope"
      end
    end

    def initialize
      @fields = Schema::Fields.new
      yield(Builder.new(@fields))
    end

    attr_reader :fields

    class SchemaTypes
    end
  end
end
