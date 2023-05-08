# typed: true

class Admin::ShipsController < AdminController
  private

  def model
    Ship
  end

  def display_schema
    Super::Display.new do |fields, type|
      fields[:name] = type.string
      fields[:registry] = type.string
      fields[:class_name] = type.string
      fields[:members] = type.manual(&:count)
      if current_action.show?
        fields[:created_at] = type.timestamp
        fields[:updated_at] = type.timestamp
      end
    end
  end

  def form_schema
    Super::Form.new do |fields, type|
      fields[:name] = type.text_field
      fields[:registry] = type.text_field
      fields[:class_name] = type.text_field
    end
  end
end
