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
        Super::Display.new(action: action) do |fields, type|
          fields[:name] = type.string
          fields[:rank] = type.string
          fields[:position] = type.string
          fields[:ship] = type.manual { |ship| "#{ship.name} (Ship ##{ship.id})" }
          fields[:created_at] = type.timestamp
          if action.show?
            fields[:updated_at] = type.timestamp
          end
        end
      end

      def form_schema(action:)
        Super::Form.new do |fields, type|
          fields[:name] = type.string
          fields[:rank] = type.select(collection: Member.ranks.keys)
          fields[:position] = type.string
          fields[:ship_id] = type.select(
            collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
          )

          fields[:favorite_things_attributes] = type.has_many(:favorite_things) do
            fields[:name] = type.string
            fields[:_destroy] = type._destroy
          end
        end
      end

      def filter_schema
        Super::Filter.new do |fields, type|
          fields[:name] = type.text
          fields[:rank] = type.select(collection: Member.ranks.values)
          fields[:position] = type.text
          fields[:ship_id] = type.select(
            collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
          )
          fields[:created_at] = type.timestamp
          fields[:updated_at] = type.timestamp
        end
      end
    end
  end
end
