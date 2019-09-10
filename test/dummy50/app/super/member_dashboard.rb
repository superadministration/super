class MemberDashboard
  def title
    Member.name.pluralize
  end

  def model
    Member
  end

  def index_scope
    Member.all
  end

  def index_schema
    Super::Schema.new(Super::Display::SchemaTypes.new) do |fields, type|
      fields[:name] = type.dynamic { |name| name }
      fields[:rank] = type.dynamic { |rank| rank }
      fields[:position] = type.dynamic { |position| position }
      fields[:ship] = type.dynamic { |ship| "#{ship.name} (Ship ##{ship.id})" }
      fields[:created_at] = type.dynamic(&:iso8601)
    end
  end

  def create_scope
    Member.all
  end

  def create_permitted_params(params)
    params.require(:member).permit(:name, :rank, :position, :ship_id)
  end

  def new_scope
    Member.all
  end

  def new_schema
    Super::Schema.new(Super::Form::SchemaTypes.new) do |fields, type|
      fields[:name] = type.generic("form_generic_text")
      fields[:rank] = type.generic("form_generic_select", collection: Member.ranks.keys)
      fields[:position] = type.generic("form_generic_text")
      fields[:ship_id] = type.generic(
        "form_generic_select",
        collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
      )
    end
  end

  def edit_scope
    Member.all
  end

  def edit_schema
    Super::Schema.new(Super::Form::SchemaTypes.new) do |fields, type|
      fields[:name] = type.generic("form_generic_text")
      fields[:rank] = type.generic("form_generic_select", collection: Member.ranks.keys)
      fields[:position] = type.generic("form_generic_text")
      fields[:ship_id] = type.generic(
        "form_generic_select",
        collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
      )
    end
  end

  def show_scope
    Member.all
  end

  def show_schema
    Super::Schema.new(Super::Display::SchemaTypes.new) do |fields, type|
      fields[:name] = type.dynamic { |name| name }
      fields[:rank] = type.dynamic { |rank| rank }
      fields[:position] = type.dynamic { |position| position }
      fields[:ship] = type.dynamic { |ship| "#{ship.name} (Ship ##{ship.id})" }
      fields[:created_at] = type.dynamic(&:iso8601)
      fields[:updated_at] = type.dynamic(&:iso8601)
    end
  end

  def update_scope
    Member.all
  end

  def update_permitted_params(params)
    params.require(:member).permit(:name, :rank, :position, :ship_id)
  end

  def destroy_scope
    Member.all
  end
end
