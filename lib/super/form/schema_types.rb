# frozen_string_literal: true

module Super
  class Form
    class SchemaTypes
      class Direct
        def initialize(super_builder:, method_name:, args:, kwargs:)
          @super_builder = super_builder
          @method_name = method_name
          @args = args
          @kwargs = kwargs
        end

        attr_reader :super_builder
        attr_reader :method_name
        attr_reader :args
        attr_reader :kwargs

        def nested_fields
          {}
        end

        def to_partial_path
          "form_field"
        end

        def ==(other)
          return false if other.class != self.class
          return false if other.super_builder != super_builder
          return false if other.method_name != method_name
          return false if other.args != args
          return false if other.kwargs != kwargs

          true
        end
      end

      class Generic
        def initialize(partial_path:, extras:, nested:)
          @partial_path = partial_path
          @extras = extras
          @nested_fields = nested
        end

        attr_reader :nested_fields
        attr_reader :extras

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

      def partial(partial_path, **extras)
        Generic.new(partial_path: partial_path, extras: extras, nested: {})
      end

      alias generic partial

      def direct(method_name, *args, super_builder: true, **kwargs)
        Direct.new(super_builder: super_builder, method_name: method_name, args: args, kwargs: kwargs)
      end

      def select(**extras)
        Generic.new(partial_path: "form_field_select", extras: extras, nested: {})
      end

      def text_field(*args, **kwargs)
        Direct.new(super_builder: true, method_name: :text_field!, args: args, kwargs: kwargs)
      end

      alias string text_field
      alias text text_field

      def rich_text_area(*args, **kwargs)
        Direct.new(super_builder: true, method_name: :rich_text_area!, args: args, kwargs: kwargs)
      end

      def check_box(*args, **kwargs)
        Direct.new(super_builder: true, method_name: :check_box!, args: args, kwargs: kwargs)
      end

      alias checkbox check_box

      def date_flatpickr(*args, **kwargs)
        Direct.new(super_builder: true, method_name: :date_flatpickr!, args: args, kwargs: kwargs)
      end

      alias flatpickr_date date_flatpickr

      def datetime_flatpickr(*args, **kwargs)
        Direct.new(super_builder: true, method_name: :datetime_flatpickr!, args: args, kwargs: kwargs)
      end

      alias flatpickr_datetime datetime_flatpickr

      def hidden_field(*args, **kwargs)
        Direct.new(super_builder: false, method_name: :hidden_field, args: args, kwargs: kwargs)
      end

      def password_field(*args, **kwargs)
        Direct.new(super_builder: true, method_name: :password_field!, args: args, kwargs: kwargs)
      end

      def time_flatpickr(*args, **kwargs)
        Direct.new(super_builder: true, method_name: :time_flatpickr!, args: args, kwargs: kwargs)
      end

      alias flatpickr_time time_flatpickr

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
