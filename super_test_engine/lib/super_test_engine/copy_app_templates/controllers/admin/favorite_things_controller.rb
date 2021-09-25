class Admin::FavoriteThingsController < AdminController
  private

  def model
    FavoriteThing
  end

  def display_schema
    Super::Display.new do |fields, type|
      fields[:name] = type.string
      fields[:member] = type.manual { |member| "#{member.name} (member ##{member.id})" }
    end
  end

  def form_schema
    Super::Form.new do |fields, type|
      fields[:name] = type.string

      fields[:member_attributes] = type.belongs_to(:member) do
        fields[:name] = type.string
        fields[:rank] = type.select(collection: Member.ranks.keys)
        fields[:position] = type.string
        fields[:ship_id] = type.select(
          collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
        )
      end
    end
  end
end
