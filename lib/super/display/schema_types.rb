# frozen_string_literal: true

module Super
  class Display
    class SchemaTypes
      TYPES = Useful::Enum.new(:column, :record, :none)

      class Builder
        extend Useful::Builder

        builder_with_block def transform(&block)
          @transform_block = block
        end

        builder def real; @real = true; end
        builder def computed; @real = false; end

        builder def column; @type = :column; end
        builder def record; @type = :record; end
        builder def none; @type = :none; end

        builder def ignore_nil; @ignore_nil = true; end

        def build
          Built.new(
            real: @real,
            type: @type,
            ignore_nil: !!@ignore_nil,
            &@transform_block
          )
        end
      end

      class Built
        def initialize(real:, type:, ignore_nil:, &transform_block)
          @real = real
          @type = type
          @ignore_nil = ignore_nil
          @transform_block = transform_block
        end

        def real?; @real; end
        attr_reader :type

        def present(attribute_name, value = nil)
          if @transform_block.nil?
            if attribute_name
              raise Error::ArgumentError, "Transformation block is not set for column: #{attribute_name}"
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

      class Badge
        extend Useful::Builder

        def initialize(builder)
          @builder = builder
          @whens = {}
          format_for_lookup(&:itself)
          format_for_display(&:itself)
        end

        builder_with_block def when(*patterns, &block)
          patterns.each do |pattern|
            @whens[pattern] = block
          end
        end

        builder_with_block def else(&block)
          @else = block
        end

        builder_with_block def format_for_lookup(&block)
          @format_for_lookup = block
        end

        builder_with_block def format_for_display(&block)
          @format_for_display = block
        end

        def build
          @builder.transform do |value|
            lookup_value = @format_for_lookup.call(value)
            block = @whens[lookup_value] || @else
            Super::Badge.new(
              @format_for_display.call(value),
              styles: block&.call
            )
          end
          @builder.build
        end
      end

      def initialize(fields:)
        @actions_called = false
        @fields = fields
      end

      def real(type = :column, &transform_block)
        TYPES
          .case(type)
          .when(:column) { Builder.new.real.ignore_nil.column.transform(&transform_block) }
          .when(:record) { Builder.new.real.ignore_nil.record.transform(&transform_block) }
          .when(:none)   { Builder.new.real.ignore_nil.none.transform(&transform_block) }
          .result
      end

      def computed(type = :column, &transform_block)
        TYPES
          .case(type)
          .when(:column) { Builder.new.computed.ignore_nil.column.transform(&transform_block) }
          .when(:record) { Builder.new.computed.ignore_nil.record.transform(&transform_block) }
          .when(:none)   { Builder.new.computed.ignore_nil.none.transform(&transform_block) }
          .result
      end

      def manual(&transform_block)
        real(:column, &transform_block)
      end

      def string; real(&:to_s); end
      alias text string

      def timestamp; real(&:to_s); end
      def time; real { |value| value.strftime("%H:%M:%S") }; end

      def rich_text
        computed do |value|
          Partial.new("display_rich_text", locals: { rich_text: value })
        end
      end

      def badge(*builder_methods)
        builder_methods = %i[real ignore_nil column] if builder_methods.empty?
        builder = builder_methods.each_with_object(Builder.new) do |builder_method, builder|
          builder.public_send(builder_method)
        end
        Badge.new(builder)
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
