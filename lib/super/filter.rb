# frozen_string_literal: true

module Super
  class Filter
    def initialize
      @schema_type = SchemaTypes.new
      @fields = Schema::Fields.new

      yield(@fields, @schema_type)
    end

    attr_reader :fields
  end
end
