module Super
  class Display
    # This schema type is meant to be used for +#index+ or +#show+ actions to
    # transform database fields into something that is human friendly.
    #
    # ```
    # class MembersController::Controls
    #   # ...
    #
    #   def show_schema
    #     Super::Schema.new(Super::Display::SchemaTypes.new) do |fields, type|
    #       fields[:name] = type.dynamic { |name| name }
    #       fields[:rank] = type.dynamic { |rank| rank }
    #       fields[:position] = type.dynamic { |position| position }
    #       fields[:ship] = type.dynamic { |ship| "#{ship.name} (Ship ##{ship.id})" }
    #       fields[:created_at] = type.dynamic { |created_at| created_at.iso8601 }
    #       fields[:updated_at] = type.dynamic { |updated_at| updated_at.iso8601 }
    #     end
    #   end
    #
    #   # ...
    # end
    # ```
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

      def initialize(action_inquirer)
        @action_inquirer = action_inquirer
        @actions_called = false
      end

      def before_yield(fields:)
        @fields = fields
      end

      def after_yield
        return if !@action_inquirer.index?
        return if @actions_called
        @fields[:actions] = actions
      end

      def dynamic(&transform_block)
        Dynamic.new(transform_block)
      end

      def actions
        @actions_called = true
        Bypass.new(partial: "super_schema_display_actions", real: false)
      end

      def to_partial_path
        if @action_inquirer.index?
          "super_schema_display_index"
        elsif @action_inquirer.show?
          "super_schema_display_show"
        else
          "super_schema_display_#{@action_inquirer.action}"
        end
      end

      # @private
      def render_field(template:, record:, column:)
        formatter = @fields[column]

        formatted =
          if formatter.real?
            value = record.public_send(column)
            formatter.present(value)
          else
            formatter.present
          end

        if formatted.respond_to?(:to_partial_path)
          if formatted.respond_to?(:locals)
            formatted.locals[:record] ||= record
            template.render(formatted, formatted.locals)
          else
            template.render(formatted)
          end
        else
          formatted
        end
      end
    end
  end
end
