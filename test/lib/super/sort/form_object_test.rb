# typed: true

require "test_helper"

class Super::Sort::FormObjectTest < ActiveSupport::TestCase
  def test_default
    form_object = new_instance(default: {name: :asc}, params: {})
    members = form_object.apply_changes(Member.unscoped)
    members_names = members.map(&:name)
    assert_equal(members_names.sort, members_names)
  end

  def test_custom_sort
    form_object = new_instance(params: {exprs: [{a: :rank, d: :asc}]})
    members = form_object.apply_changes(Member.unscoped)
    ranks = members.map(&:rank)
    assert_equal(ranks.sort, ranks)
  end

  def test_multiple_sorts
    form_object = new_instance(params: {exprs: [{a: :rank, d: :asc}, {a: :name, d: :asc}]})
    members = form_object.apply_changes(Member.unscoped)
    ranks = members.map(&:rank)
    names_by_ranks = members.group_by(&:rank).transform_values do |mems|
      mems.map(&:name)
    end

    assert_equal(ranks.sort, ranks)
    ranks.uniq.each do |rank|
      assert_equal(names_by_ranks[rank].sort, names_by_ranks[rank])
    end
  end

  def test_duplicate_attribute_sorts_looks_at_first
    form_object = new_instance(params: {exprs: [{a: :name, d: :asc}, {a: :name, d: :desc}]})
    members = form_object.apply_changes(Member.unscoped)
    members_names = members.map(&:name)
    assert_equal(members_names.sort, members_names)
  end

  def test_nonsortable_columns_arent_sorted
    form_object = new_instance(params: {exprs: [{a: :name, d: :asc}]}, sortable_columns: [:id])
    members = form_object.apply_changes(Member.unscoped)
    members_names = members.map(&:name)
    assert_not_equal(members_names.sort, members_names)
  end

  def test_blank_attributes_are_ignored
    form_object = new_instance(params: {exprs: [{a: :name, d: :asc}, {a: "", d: :desc}]})
    assert_equal(1, form_object.exprs.size)
    assert_equal("name", form_object.exprs[0].a)
    assert_equal("asc", form_object.exprs[0].d)
  end

  private

  def new_instance(params:, model: Member, default: {id: :desc}, sortable_columns: model.column_names)
    Super::Sort::FormObject.new(
      model: model,
      params: params.with_indifferent_access,
      sortable_columns: sortable_columns,
      default: default
    )
  end
end
