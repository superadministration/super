# frozen_string_literal: true

module Super
  class Display
    class SchemaTypes
      TYPES = Useful::Enum.new(:attribute, :record, :none)

      class Builder
        extend Useful::Builder

        builder_with_block def transform(&block)
          @transform_block = block
        end

        builder def real; @real = true; end
        builder def computed; @real = false; end

        builder def attribute; @type = :attribute; end
        builder def record; @type = :record; end
        builder def none; @type = :none; end

        builder def ignore_nil; @ignore_nil = true; end

        builder def attribute_name(name); @attribute_name = name; end

        def build
          Built.new(
            real: @real,
            type: @type,
            ignore_nil: !!@ignore_nil,
            attribute_name: @attribute_name,
            &@transform_block
          )
        end
      end

      class Built
        def initialize(real:, type:, ignore_nil:, attribute_name:, &transform_block)
          @real = real
          @type = type
          @ignore_nil = ignore_nil
          @attribute_name = attribute_name
          @transform_block = transform_block
        end

        def real?; @real; end
        attr_reader :type
        attr_reader :attribute_name

        def present(attribute_name, value = nil)
          if @transform_block.nil?
            if attribute_name
              raise Error::ArgumentError, "Transformation block is not set for attribute: #{attribute_name}"
            else
              raise Error::ArgumentError, "Transformation block is not set!"
            end
          end

          return nil if value.nil? && @ignore_nil

          if @type == :none
            @transform_block.call
          else
            @transform_block.call(value)
          end
        end
      end

      def initialize(fields:)
        @actions_called = false
        @fields = fields
      end

      def real(type = :attribute, &transform_block)
        TYPES
          .case(type)
          .when(:attribute) { Builder.new.real.ignore_nil.attribute.transform(&transform_block) }
          .when(:record)    { Builder.new.real.ignore_nil.record.transform(&transform_block) }
          .when(:none)      { Builder.new.real.ignore_nil.none.transform(&transform_block) }
          .result
      end

      def computed(type = :attribute, &transform_block)
        TYPES
          .case(type)
          .when(:attribute) { Builder.new.computed.ignore_nil.attribute.transform(&transform_block) }
          .when(:record)    { Builder.new.computed.ignore_nil.record.transform(&transform_block) }
          .when(:none)      { Builder.new.computed.ignore_nil.none.transform(&transform_block) }
          .result
      end

      def manual(&transform_block)
        real(:attribute, &transform_block)
      end

      def batch
        real do |value|
          Partial.new("batch_checkbox", locals: { value: value })
        end
      end

      def string; real(&:to_s); end

      def timestamp; real(&:to_s); end
      def time; real { |value| value.strftime("%H:%M:%S") }; end

      def rich_text
        computed do |value|
          Partial.new("display_rich_text", locals: { rich_text: value })
        end
      end

      def actions
        @actions_called = true
        Builder.new.computed.none.transform do
          Partial.new("display_actions")
        end
      end

      # @private
      def actions_called?
        @actions_called
      end
    end
  end
end
