# frozen_string_literal: true

module Super
  # This schema type is used on your +#edit+ and +#new+ forms
  #
  # ```ruby
  # class MembersController::Controls
  #   # ...
  #
  #   def new_schema
  #     Super::Form.new do |fields, type|
  #       fields[:name] = type.string
  #       fields[:rank] = type.select
  #       fields[:position] = type.string
  #       fields[:ship_id] = type.select(
  #         collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
  #       )
  #     end
  #   end
  #
  #   # ...
  # end
  # ```
  class Form
    include Schema::Common

    def initialize
      @fields = Schema::Fields.new
      @schema_types = SchemaTypes.new(fields: @fields)
      yield(@fields, @schema_types)
    end

    def to_partial_path
      "form"
    end
  end
end
