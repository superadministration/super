module Super
  class Filter
    def initialize
      @schema_type = Filter::SchemaTypes.new
      @fields = Schema::Fields.new

      yield(@fields, @schema_type)
    end

    attr_reader :fields
  end
end
