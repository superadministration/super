module Super
  class Form
    class SchemaTypes
      class Generic
        def initialize(partial_path:, extras:, nested:)
          @partial_path = partial_path
          @extras = extras
          @nested_fields = nested
        end

        attr_reader :nested_fields

        def each_attribute
          if block_given?
            @nested_fields.each do |key, value|
              yield(key, value)
            end
          end

          enum_for(:each_attribute)
        end

        # This takes advantage of a feature of Rails. If the value of
        # `#to_partial_path` is `my_form_field`, Rails renders
        # `app/views/super/application/_my_form_field.html.erb`, and this
        # instance of Generic is accessible via `my_form_field`
        #
        # @return [String] the filename of the partial that will be rendered.
        def to_partial_path
          @partial_path
        end

        def [](key)
          @extras[key]
        end

        def reader
          @extras[:reader]
        end

        def label
          if @extras.key?(:label)
            return @extras[:label]
          end

          if @extras.key?(:reader)
            return @extras[:reader].to_s.singularize.humanize
          end
        end

        def ==(other)
          return false if other.class != self.class
          return false if other.instance_variable_get(:@partial_path) != @partial_path
          return false if other.instance_variable_get(:@extras) != @extras
          return false if other.instance_variable_get(:@nested_fields) != @nested_fields

          true
        end
      end

      def initialize(fields:)
        @fields = fields
      end

      def generic(partial_path, **extras)
        Generic.new(partial_path: partial_path, extras: extras, nested: {})
      end

      def select(**extras)
        Generic.new(partial_path: "form_field_select", extras: extras, nested: {})
      end

      def string(**extras)
        Generic.new(partial_path: "form_field_text", extras: extras, nested: {})
      end

      def has_many(reader, **extras)
        nested = @fields.nested do
          yield
        end

        Generic.new(
          partial_path: "form_has_many",
          extras: extras.merge(reader: reader),
          nested: nested
        )
      end

      def has_one(reader, **extras)
        nested = @fields.nested do
          yield
        end

        Generic.new(
          partial_path: "form_has_one",
          extras: extras.merge(reader: reader),
          nested: nested
        )
      end

      alias_method :belongs_to, :has_one

      def _destroy(**extras)
        Generic.new(
          partial_path: "form_field__destroy",
          extras: extras,
          nested: {}
        )
      end
    end
  end
end
