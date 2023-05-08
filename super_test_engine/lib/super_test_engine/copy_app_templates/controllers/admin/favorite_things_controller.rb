# typed: true

class Admin::FavoriteThingsController < AdminController
  private

  def model
    FavoriteThing
  end

  def base_scope
    if params[:member_id]
      super.where(member_id: params[:member_id])
    else
      super
    end
  end

  def resolve_collection_action(action)
    action.process_href do |href|
      href[:member_id] = params[:member_id]
      href
    end

    super
  end

  def paginated_link(page_query_params)
    admin_member_favorite_things_path(params[:member_id], page_query_params)
  end

  def form_action(record)
    if current_action.new?
      admin_member_favorite_things_path(params[:member_id])
    else
      admin_favorite_thing_path(record)
    end
  end

  def display_schema
    Super::Display.new do |fields, type|
      fields[:name] = type.string
      fields[:member] = type.manual { |member| "#{member.name} (member ##{member.id})" }
    end
  end

  def form_schema
    Super::Form.new do |fields, type|
      fields[:name] = type.text_field

      fields[:member_attributes] = type.belongs_to(:member) do
        fields[:name] = type.text_field
        fields[:rank] = type.select(Member.ranks.keys)
        fields[:position] = type.text_field
        fields[:ship_id] = type.select(
          Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] }
        )
      end
    end
  end
end
