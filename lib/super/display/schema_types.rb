# frozen_string_literal: true

module Super
  class Display
    class SchemaTypes
      class Dynamic
        def initialize(ignore_nil: true, &transform_block)
          @transform_block = transform_block
          @ignore_nil = ignore_nil
        end

        def present(value)
          return nil if value.nil? && @ignore_nil

          @transform_block.call(value)
        end

        def real?
          true
        end
      end

      class Bypass
        def initialize(partial:, real:)
          @partial = partial
          @real = real
        end

        def present
          Partial.new(@partial)
        end

        def real?
          @real
        end
      end

      def initialize(fields:)
        @actions_called = false
        @fields = fields
      end

      def string
        Dynamic.new(&:to_s)
      end

      alias text string

      def timestamp
        Dynamic.new(&:iso8601)
      end

      def rich_text
        Dynamic.new do |value|
          Partial.new("display_rich_text", locals: { rich_text: value })
        end
      end

      def manual(&transform_block)
        Dynamic.new(&transform_block)
      end

      def dynamic(&transform_block)
        Dynamic.new(&transform_block)
      end

      def actions
        @actions_called = true
        Bypass.new(partial: "super_schema_display_actions", real: false)
      end

      # @private
      def actions_called?
        @actions_called
      end
    end
  end
end
