module Admin
  class FavoriteThingsController < AdminController
    private

    def new_controls
      Controls.new
    end

    class Controls
      def title
        FavoriteThing.name.pluralize
      end

      def model
        FavoriteThing
      end

      def scope(action:)
        FavoriteThing.all
      end

      def permitted_params(params, action:)
        params.require(:favorite_thing).permit(:name, member_attributes: [:id, :name, :rank, :position, :ship_id])
      end

      def display_schema(action:)
        Super::Schema.new(Super::Display::SchemaTypes.new) do |fields, type|
          fields[:name] = type.dynamic(&:itself)
          fields[:member] = type.dynamic { |member| "#{member.name} (member ##{member.id})" }
        end
      end

      def form_schema(action:)
        Super::Schema.new(Super::Form::SchemaTypes.new) do |fields, type|
          fields[:name] = type.generic("form_field_text")

          fields[:member_attributes] = type.belongs_to(:member) do
            fields[:name] = type.generic("form_field_text")
            fields[:rank] = type.generic("form_field_select", collection: Member.ranks.keys)
            fields[:position] = type.generic("form_field_text")
            fields[:ship_id] = type.generic(
              "form_field_select",
              collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
            )
          end
        end
      end
    end
  end
end
