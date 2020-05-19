module Admin
  class ShipsController < AdminController
    private

    def new_controls
      Controls.new
    end

    class Controls
      def title
        Ship.name.pluralize
      end

      def model
        Ship
      end

      def scope(action:)
        Ship.all
      end

      def permitted_params(params, action:)
        params.require(:ship).permit(:name, :registry, :class_name)
      end

      def display_schema(action:)
        Super::Schema.new(Super::Display::SchemaTypes.new) do |fields, type|
          fields[:name] = type.dynamic(&:itself)
          fields[:registry] = type.dynamic(&:itself)
          fields[:class_name] = type.dynamic(&:itself)
          if action.show?
            fields[:created_at] = type.dynamic(&:iso8601)
            fields[:updated_at] = type.dynamic(&:iso8601)
          end
        end
      end

      def form_schema(action:)
        Super::Schema.new(Super::Form::SchemaTypes.new) do |fields, type|
          fields[:name] = type.generic("form_field_text")
          fields[:registry] = type.generic("form_field_text")
          fields[:class_name] = type.generic("form_field_text")
        end
      end
    end
  end
end
