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

    def initialize
      @fields = Super::Schema::Fields.new
      @schema_types = SchemaTypes.new(fields: @fields)

      yield(@fields, @schema_types)
    end

    def apply(action:, format:)
      @action_inquirer = action
      return self if !@action_inquirer.index?
      return self if @schema_types.actions_called?
      return self if !format.html?
      @fields[:actions] = @schema_types.actions
      self
    end

    def to_partial_path
      if @action_inquirer.nil?
        raise Super::Error::Initalization,
          "You must call the `#apply` method after instantiating Super::Display"
      elsif @action_inquirer.index?
        "display_index"
      elsif @action_inquirer.show?
        "display_show"
      else
        "display_#{@action_inquirer.action}"
      end
    end

    # @private
    def render_attribute(template:, record:, column:)
      formatter = @fields[column]
      formatter = formatter.build if formatter.respond_to?(:build)

      formatted =
        SchemaTypes::TYPES
        .case(formatter.type)
        .when(:record) do
          formatter.present(column, record)
        end
        .when(:column) do
          value = record.public_send(column)
          formatter.present(column, value)
        end
        .when(:none) do
          formatter.present(column)
        end
        .result

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
