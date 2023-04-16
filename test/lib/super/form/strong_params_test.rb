require "test_helper"

module Super
  class StrongParamsTest < ActiveSupport::TestCase
    def test_basic
      form = Super::Form.new do |fields, type|
        fields[:name] = type.text_field
      end

      assert_equal(
        [:name],
        Form::StrongParams.new(form).permit
      )
    end

    def test_has_many
      form = Super::Form.new do |fields, type|
        fields[:name] = type.text_field
        fields[:widgets_attributes] = type.has_many(:widgets) do |wf|
          wf[:knob] = type.text_field
          wf[:lever] = type.text_field
          wf[:display] = type.text_field
          wf[:_destroy] = type._destroy
        end
        fields[:buttons_attributes] = type.has_many(:buttons) do |bf|
          bf[:label] = type.text_field
        end
      end

      assert_equal(
        [
          :name,
          {widgets_attributes: [:id, :knob, :lever, :display, :_destroy]},
          {buttons_attributes: [:id, :label]}
        ],
        Form::StrongParams.new(form).permit
      )
    end

    def test_has_one
      form = Super::Form.new do |fields, type|
        fields[:name] = type.text_field
        fields[:widget_attributes] = type.has_one(:widget) do |wf|
          wf[:knob] = type.text_field
          wf[:lever] = type.text_field
          wf[:display] = type.text_field
          wf[:_destroy] = type._destroy
        end
        fields[:button_attributes] = type.belongs_to(:button) do |bf|
          bf[:label] = type.text_field
        end
      end

      assert_equal(
        [
          :name,
          {widget_attributes: [:id, :knob, :lever, :display, :_destroy]},
          {button_attributes: [:id, :label]}
        ],
        Form::StrongParams.new(form).permit
      )
    end
  end
end
