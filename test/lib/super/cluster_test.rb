# typed: false

require "test_helper"

class ClusterTest < ActiveSupport::TestCase
  def schema
    Super::Cluster.new do |s|
      s.option(:all) { |rel| rel.all }
      s.option(:none) { |rel| rel.none }
      s.option(:picard) { |rel| rel.where(name: "Jean-Luc Picard") }
    end
  end

  def test_specified_filter
    params = {id: "picard"}

    form_object = Super::Cluster::FormObject.new(model: Member, params: params.with_indifferent_access, schema: schema)
    results = form_object.apply_changes(Member.all)

    assert_equal("picard", form_object.id)
    assert_kind_of(ActiveRecord::Relation, results)
    assert_equal(1, results.size)
    assert_equal("Jean-Luc Picard", results.first.name)
  end

  def test_blank
    params = {id: "none"}

    form_object = Super::Cluster::FormObject.new(model: Member, params: params.with_indifferent_access, schema: schema)
    results = form_object.apply_changes(Member.all)

    assert_equal("none", form_object.id)
    assert_kind_of(ActiveRecord::Relation, results)
    assert_equal(0, results.size)
  end

  def test_invalid_falls_back_to_first
    params = {id: "does not exist"}

    form_object = Super::Cluster::FormObject.new(model: Member, params: params.with_indifferent_access, schema: schema)
    results = form_object.apply_changes(Member.all)

    assert_equal("all", form_object.id)
    assert_kind_of(ActiveRecord::Relation, results)
    assert_equal(56, results.size)
  end
end
