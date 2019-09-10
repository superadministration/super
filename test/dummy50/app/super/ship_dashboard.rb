class ShipDashboard
  def title
    Ship.name.pluralize
  end

  def model
    Ship
  end

  def index_scope
    Ship.all
  end

  def index_schema
    Super::Schema.new(Super::Display::SchemaTypes.new) do |fields, type|
      fields[:name] = type.dynamic { |name| name }
      fields[:registry] = type.dynamic { |registry| registry }
      fields[:class_name] = type.dynamic { |class_name| class_name }
    end
  end

  def create_scope
    Ship.all
  end

  def create_permitted_params(params)
    params.require(:ship).permit(:name, :registry, :class_name)
  end

  def new_scope
    Ship.all
  end

  def new_schema
    Super::Schema.new(Super::Form::SchemaTypes.new) do |fields, type|
      fields[:name] = type.generic("form_generic_text")
      fields[:registry] = type.generic("form_generic_text")
      fields[:position] = type.generic("form_generic_text")
    end
  end

  def edit_scope
    Ship.all
  end

  def edit_schema
    Super::Schema.new(Super::Form::SchemaTypes.new) do |fields, type|
      fields[:name] = type.generic("form_generic_text")
      fields[:registry] = type.generic("form_generic_text")
      fields[:position] = type.generic("form_generic_text")
    end
  end

  def show_scope
    Ship.all
  end

  def show_schema
    Super::Schema.new(Super::Display::SchemaTypes.new) do |fields, type|
      fields[:name] = type.dynamic { |name| name }
      fields[:registry] = type.dynamic { |registry| registry }
      fields[:class_name] = type.dynamic { |class_name| class_name }
      fields[:created_at] = type.dynamic(&:iso8601)
      fields[:updated_at] = type.dynamic(&:iso8601)
    end
  end

  def update_scope
    Ship.all
  end

  def update_permitted_params(params)
    params.require(:ship).permit(:name, :registry, :class_name)
  end

  def destroy_scope
    Ship.all
  end
end
