# typed: true

require "test_helper"

class FilterTest < ActiveSupport::TestCase
  def test_one_field
    schema = Super::Filter.new do |f, operators|
      f[:name] = operators.use("contain")
    end

    params = {
      f: {
        name: {
          contain: {
            q: "Jean"
          }
        }
      }
    }

    form_object = Super::Filter::FormObject.new(model: Member, params: params[:f].with_indifferent_access, schema: schema)
    results = form_object.apply_changes(Member.all)

    assert_kind_of(ActiveRecord::Relation, results)
    assert_equal(1, results.size)
    assert_equal("Jean-Luc Picard", results.first.name)
  end

  def test_ignore_params_for_operator_not_in_schema
    schema = Super::Filter.new do |f, operators|
      f[:name] = operators.use(:contain)
    end

    params = {
      f: {
        name: {
          eq: {
            q: "Jean-Luc Picard"
          }
        }
      }
    }

    form_object = Super::Filter::FormObject.new(model: Member, params: params[:f].with_indifferent_access, schema: schema)
    results = form_object.apply_changes(Member.all)

    assert_equal(Member.all.to_sql, results.to_sql)
  end

  def test_multiple_operators_with_same_identifier
    assert_raises(Super::Error::AlreadyRegistered) do
      Super::Filter.new do |f, operators|
        f[:name] = operators.use("contain", "contain")
      end
    end
  end
end
