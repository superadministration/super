require "test_helper"

module Super
  class StrongParamsTest < ActiveSupport::TestCase
    def test_basic
      form = Super::Form.new do |fields, type|
        fields[:name] = type.string
      end

      assert_equal(
        [:name],
        Form::StrongParams.new(form).permit
      )
    end

    def test_has_many
      form = Super::Form.new do |fields, type|
        fields[:name] = type.string
        fields[:widgets_attributes] = type.has_many(:widgets) do
          fields[:knob] = type.string
          fields[:lever] = type.string
          fields[:display] = type.string
          fields[:_destroy] = type._destroy
        end
        fields[:buttons_attributes] = type.has_many(:buttons) do
          fields[:label] = type.string
        end
      end

      assert_equal(
        [
          :name,
          { widgets_attributes: [:id, :knob, :lever, :display, :_destroy] },
          { buttons_attributes: [:id, :label] },
        ],
        Form::StrongParams.new(form).permit
      )
    end

    def test_has_one
      form = Super::Form.new do |fields, type|
        fields[:name] = type.string
        fields[:widget_attributes] = type.has_one(:widget) do
          fields[:knob] = type.string
          fields[:lever] = type.string
          fields[:display] = type.string
          fields[:_destroy] = type._destroy
        end
        fields[:button_attributes] = type.belongs_to(:button) do
          fields[:label] = type.string
        end
      end

      assert_equal(
        [
          :name,
          { widget_attributes: [:id, :knob, :lever, :display, :_destroy] },
          { button_attributes: [:id, :label] },
        ],
        Form::StrongParams.new(form).permit
      )
    end
  end
end
