# frozen_string_literal: true

module Admin
  class ShipsController < AdminController
    private

    def new_controls
      Controls.new
    end

    class Controls < Super::Controls
      def title
        Ship.name.pluralize
      end

      def model
        Ship
      end

      def scope(action:)
        Ship.all
      end

      def display_schema(action:)
        Super::Display.new do |fields, type|
          fields[:name] = type.string
          fields[:registry] = type.string
          fields[:class_name] = type.string
          fields[:members] = type.manual(&:count)
          if action.show?
            fields[:created_at] = type.timestamp
            fields[:updated_at] = type.timestamp
          end
        end
      end

      def form_schema(action:)
        Super::Form.new do |fields, type|
          fields[:name] = type.string
          fields[:registry] = type.string
          fields[:class_name] = type.string
        end
      end
    end
  end
end
