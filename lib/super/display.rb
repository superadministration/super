# frozen_string_literal: true

module Super
  # This schema type is meant to be used for +#index+ or +#show+ actions to
  # transform database fields into something that is human friendly.
  #
  # ```
  # class MembersController::Controls
  #   # ...
  #
  #   def show_schema
  #     Super::Display.new do |fields, type|
  #       fields[:name] = type.manual { |name| name }
  #       fields[:rank] = type.manual { |rank| rank }
  #       fields[:position] = type.manual { |position| position }
  #       fields[:ship] = type.manual { |ship| "#{ship.name} (Ship ##{ship.id})" }
  #       fields[:created_at] = type.manual { |created_at| created_at.iso8601 }
  #       fields[:updated_at] = type.manual { |updated_at| updated_at.iso8601 }
  #     end
  #   end
  #
  #   # ...
  # end
  # ```
  class Display
    include Schema::Common

    def initialize(action:)
      @action_inquirer = action
      @fields = Super::Schema::Fields.new
      @schema_types = SchemaTypes.new(fields: @fields)

      yield(@fields, @schema_types)

      return if !@action_inquirer.index?
      return if @schema_types.actions_called?
      @fields[:actions] = @schema_types.actions
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
