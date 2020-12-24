module Super
  class Display
    class SchemaTypes
      class Dynamic
        def initialize(transform_block)
          @transform_block = transform_block
        end

        def present(value)
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

      def dynamic(&transform_block)
        Dynamic.new(transform_block)
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
