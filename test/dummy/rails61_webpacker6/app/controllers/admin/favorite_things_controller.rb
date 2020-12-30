module Admin
  class FavoriteThingsController < AdminController
    private

    def new_controls
      Controls.new
    end

    class Controls < Super::Controls
      def title
        FavoriteThing.name.pluralize
      end

      def model
        FavoriteThing
      end

      def scope(action:)
        FavoriteThing.all
      end

      def display_schema(action:)
        Super::Display.new(action: action) do |fields, type|
          fields[:name] = type.string
          fields[:member] = type.manual { |member| "#{member.name} (member ##{member.id})" }
        end
      end

      def form_schema(action:)
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
  end
end
