# typed: false

require "test_helper"

module FormSchemaTypesTests
  class FormIntegration < ActionDispatch::IntegrationTest
    private

    def form
      Nokogiri::HTML::Document.parse(response.body).at_css("form")
    end
  end

  class CollectionCheckBoxesTest < FormIntegration
    controller(Super::ApplicationController) do
      def model
        Sink
      end

      def form_schema
        choices = {
          lorem: :ipsum,
          dolor: :sit,
          amet: :consecutor
        }
        Super::Form.new do |f, type|
          f[:string_column] = type.collection_check_boxes(choices, :first, :last, field: {include_hidden: false}, field_html: {})
        end
      end
    end

    def test_it
      get "/anonymous/new"
      # Rails 5.x seems to add a hidden `utf8` input
      assert_equal(0, form.css("input[type=hidden]").count { |i| i.attr("name") != "utf8" })
      assert_equal(["lorem", "dolor", "amet"], form.css("input[type=checkbox]").map { |i| i.attr("value") })
      assert_equal(["String column", "ipsum", "sit", "consecutor"], form.css("label").map(&:text))
    end
  end

  class SelectTest < FormIntegration
    controller(Super::ApplicationController) do
      def model
        Sink
      end

      def form_schema
        Super::Form.new do |f, type|
          f[:integer_column] = type.select([1, 2, 3])
        end
      end
    end

    def test_it
      get "/anonymous/new"
      assert_equal(["", "1", "2", "3"], form.css("option").map(&:text))
    end
  end

  class CheckBoxTest < FormIntegration
    controller(Super::ApplicationController) do
      def model
        Sink
      end

      def form_schema
        Super::Form.new do |f, type|
          f[:string_column] = type.check_box(checked_value: "i am checked", unchecked_value: "i am unchecked")
        end
      end
    end

    def test_it
      get "/anonymous/new"
      assert_equal("i am unchecked", form.at_css("input[type=hidden][name='sink[string_column]']").attr("value"))
      assert_equal("i am checked", form.at_css("input[type=checkbox][name='sink[string_column]']").attr("value"))
    end
  end
end

class FormSchemaTypesTest < ActiveSupport::TestCase
  def test_basic
    result = Super::Form.new do |fields, type|
      fields[:name] = type.partial("cool_partial_path")
    end

    assert_equal(
      {
        name: Super::Form::SchemaTypes::Generic.new(
          partial_path: "cool_partial_path",
          extras: {},
          nested: {}
        )
      },
      result.instance_variable_get(:@fields).to_h
    )
  end

  def test_has_many_with_yield
    result = Super::Form.new do |fields, type|
      fields[:widgets_attributes] = type.has_many(:widgets) do |subfields|
        subfields[:name] = type.partial("cool_partial_path")
      end
    end

    assert_equal(
      {
        widgets_attributes: Super::Form::SchemaTypes::Generic.new(
          partial_path: "form_has_many",
          extras: {reader: :widgets},
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

  def test_has_many
    result = Super::Form.new do |fields, type|
      fields[:widgets_attributes] = type.has_many(:widgets) do |wf|
        wf[:name] = type.partial("cool_partial_path")
      end
    end

    assert_equal(
      {
        widgets_attributes: Super::Form::SchemaTypes::Generic.new(
          partial_path: "form_has_many",
          extras: {reader: :widgets},
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

    def form_record(record)
      record
    end

    def form_action(record)
      Super::Link.polymorphic_parts(record)
    end
  end

  class Row < ActiveRecord::Base
    self.table_name = :rows
  end

  def test_date_flatpickr
    form = Super::Form.new do |fields, type|
      fields[:date_col] = type.date_flatpickr
    end

    @record = Row.create!(date_col: Date.today).reload
    view.extend(Super::FormBuilderHelper)
    render(form)
  end

  def test_datetime_flatpickr
    form = Super::Form.new do |fields, type|
      fields[:datetime_col] = type.datetime_flatpickr
    end

    @record = Row.create!(datetime_col: Time.now).reload
    view.extend(Super::FormBuilderHelper)
    render(form)
  end

  def test_time_flatpickr
    form = Super::Form.new do |fields, type|
      fields[:time_col] = type.time_flatpickr
    end

    @record = Row.create!(datetime_col: "04:56").reload
    view.extend(Super::FormBuilderHelper)
    render(form)
  end
end
