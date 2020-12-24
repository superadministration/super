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
    def initialize
      @fields = Schema::Fields.new
      @schema_types = SchemaTypes.new(fields: @fields)
      yield(@fields, @schema_types)
    end

    def each_attribute_name
      if block_given?
        @fields.keys.each do |key|
          yield(key)
        end
      end

      enum_for(:each_attribute_name)
    end

    def each_attribute
      if block_given?
        @fields.each do |key, value|
          yield(key, value)
        end
      end

      enum_for(:each_attribute)
    end

    def to_partial_path
      "super_schema_form"
    end
  end
end
