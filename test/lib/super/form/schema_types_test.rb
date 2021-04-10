require "test_helper"

class FormSchemaTypesTest < ActiveSupport::TestCase
  def test_basic
    result = Super::Form.new do |fields, type|
      fields[:name] = type.generic("cool_partial_path")
    end

    assert_equal(
      {
        name: Super::Form::SchemaTypes::Generic.new(
          partial_path: "cool_partial_path",
          extras: {},
          nested: {}
        ),
      },
      result.instance_variable_get(:@fields).to_h
    )
  end

  def test_has_many
    result = Super::Form.new do |fields, type|
      fields[:widgets_attributes] = type.has_many(:widgets) do
        fields[:name] = type.generic("cool_partial_path")
      end
    end

    assert_equal(
      {
        widgets_attributes: Super::Form::SchemaTypes::Generic.new(
          partial_path: "form_has_many",
          extras: { reader: :widgets },
          nested: {
            name: Super::Form::SchemaTypes::Generic.new(
              partial_path: "cool_partial_path",
              extras: {},
              nested: {}
            )
          }
        )
      },
      result.instance_variable_get(:@fields).to_h
    )
  end
end

class FormSchemaTypesViewTest < ActionView::TestCase
  include CustomDatabaseSchema

  custom_schema do
    ActiveRecord::Schema.define(version: 1) do
      create_table :rows do |t|
        t.date :date_col
        t.datetime :datetime_col
        t.time :time_col
      end
    end
  end

  ad_hoc_view_helpers do
    def admin_form_schema_types_view_test_rows_path
      "/testing"
    end

    def admin_form_schema_types_view_test_row_path(*)
      "/testing"
    end
  end

  class Row < ActiveRecord::Base
    self.table_name = :rows
  end

  def test_flatpickr_date
    form = Super::Form.new do |fields, type|
      fields[:date_col] = type.flatpickr_date
    end

    @record = Row.create!(date_col: Date.today).reload
    view.extend(Super::FormBuilderHelper)
    render(form)
  end

  def test_flatpickr_datetime
    form = Super::Form.new do |fields, type|
      fields[:datetime_col] = type.flatpickr_datetime
    end

    @record = Row.create!(datetime_col: Time.now).reload
    view.extend(Super::FormBuilderHelper)
    render(form)
  end

  def test_flatpickr_time
    form = Super::Form.new do |fields, type|
      fields[:time_col] = type.flatpickr_time
    end

    @record = Row.create!(datetime_col: "04:56").reload
    view.extend(Super::FormBuilderHelper)
    render(form)
  end
end
