module Super
  # The Schema is a general purpose container for describing the "schema"
  # for various purposes. It primarily exists to provide a cohesive user-facing
  # API for defining schemas.
  #
  # The various "schema types" are likely of more interest
  class Schema
    # @param schema_type [Display::SchemaTypes, Form::SchemaTypes]
    def initialize(schema_type)
      @schema_type = schema_type
      @fields = {}

      if block_given?
        yield(@fields, @schema_type)
      end
    end

    attr_reader :fields

    def field_keys
      fields.keys
    end
  end
end
