module Admin
  class MembersController < AdminController
    def show
      super
      @view.mains.push(Super::Partial.new("favorite_things"))
    end

    private

    def new_controls
      Controls.new
    end

    class Controls
      def title
        Member.name.pluralize
      end

      def model
        Member
      end

      def scope(action:)
        Member.all
      end

      def permitted_params(params, action:)
        params.require(:member).permit(:name, :rank, :position, :ship_id, favorite_things_attributes: [:id, :name, :_destroy])
      end

      def display_schema(action:)
        Super::Schema.new(Super::Display::SchemaTypes.new(action)) do |fields, type|
          fields[:name] = type.dynamic(&:itself)
          fields[:rank] = type.dynamic(&:itself)
          fields[:position] = type.dynamic(&:itself)
          fields[:ship] = type.dynamic { |ship| "#{ship.name} (Ship ##{ship.id})" }
          fields[:created_at] = type.dynamic(&:iso8601)
          if action.show?
            fields[:updated_at] = type.dynamic(&:iso8601)
          end
        end
      end

      def form_schema(action:)
        Super::Schema.new(Super::Form::SchemaTypes.new) do |fields, type|
          fields[:name] = type.generic("form_field_text")
          fields[:rank] = type.generic("form_field_select", collection: Member.ranks.keys)
          fields[:position] = type.generic("form_field_text")
          fields[:ship_id] = type.generic(
            "form_field_select",
            collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
          )

          fields[:favorite_things_attributes] = type.has_many(:favorite_things) do
            fields[:name] = type.generic("form_field_text")
            fields[:_destroy] = type._destroy
          end
        end
      end
    end
  end
end
