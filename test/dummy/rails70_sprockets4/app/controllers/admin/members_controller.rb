class Admin::MembersController < AdminController
  def show
    super
    @view.main.insert(:favorite_things, Super::Partial.new("favorite_things"), before: :main_panel)
  end

  batch def batch_noop
    flash.notice = "Received batch IDs: #{params[:batch].join(", ")}"

    redirect_to admin_members_path
  end

  private

  def model
    Member
  end

  def base_scope
    super.preload(:ship)
  end

  def display_schema
    Super::Display.new do |fields, type|
      fields[:id] = type.batch
      fields[:name] = type.string
      fields[:rank] = type.string
      fields[:position] = type.string
      fields[:ship] = type.manual { |ship| "#{ship.name} (Ship ##{ship.id})" }
      fields[:created_at] = type.timestamp
      if current_action.show?
        fields[:updated_at] = type.timestamp
      end
    end
  end

  def form_schema
    Super::Form.new do |fields, type|
      fields[:name] = type.text_field
      fields[:rank] = type.select(Member.ranks.keys)
      fields[:position] = type.text_field
      fields[:ship_id] = type.select(
        Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
      )

      fields[:favorite_things_attributes] = type.has_many(:favorite_things) do |ftaf|
        ftaf[:name] = type.text_field
        ftaf[:_destroy] = type._destroy
      end
    end
  end

  def filter_schema
    Super::Filter.new do |fields, type|
      fields[:name] = type.text
      fields[:rank] = type.select(Member.ranks.values)
      fields[:position] = type.text
      fields[:ship_id] = type.select(
        Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
      )
      fields[:created_at] = type.timestamp
      fields[:updated_at] = type.timestamp
    end
  end

  def sortable_columns
    ["id"] + super
  end

  def default_sort
    { id: :asc }
  end

  def batch_actions
    [
      Super::Link.new("No-op", batch_noop_admin_members_path, method: :post),
    ]
  end
end
