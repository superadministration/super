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
      @fields = Fields.new

      @schema_type.before_yield(fields: @fields)

      if block_given?
        yield(@fields, @schema_type)
      end

      @schema_type.after_yield
    end

    attr_reader :fields

    def field_keys
      fields.keys
    end

    def to_partial_path
      @schema_type.to_partial_path
    end

    class Fields
      include Enumerable

      def initialize
        @backing = {}
      end

      def [](key)
        @backing[key]
      end

      def []=(key, value)
        @backing[key] = value
      end

      def keys
        @backing.keys
      end

      def values
        @backing.values
      end

      def each
        if block_given?
          return @backing.each(&Proc.new)
        end

        enum_for(:each)
      end

      def replace(other)
        @backing = other
      end

      def to_h
        @backing
      end

      def nested
        outside = @backing
        inside = {}
        @backing = inside
        yield
        @backing = outside
        inside
      end
    end
  end
end
