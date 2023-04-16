require "test_helper"

class ReorderableHashTest < ActiveSupport::TestCase
  test "ordering of keys is preserved for the keys passed into the initializer" do
    rehash = Super::ReorderableHash.new(foo: 1, bar: 2, baz: 3)
    assert_equal(%i[foo bar baz], rehash.keys)
  end

  test "ordering of values is respective to ordering of keys" do
    rehash = Super::ReorderableHash.new(foo: 2)
    rehash.insert(:bar, 1, after: :foo)
    rehash.insert(:baz, 3, after: :bar)
    assert_equal([2, 1, 3], rehash.values)
  end

  test "insert before" do
    rehash = Super::ReorderableHash.new(foo: 2)
    rehash.insert(:bar, 1, before: :foo)
    assert_equal([:bar, :foo], rehash.keys)
  end

  test "insert after" do
    rehash = Super::ReorderableHash.new(foo: 2)
    rehash.insert(:bar, 1, after: :foo)
    assert_equal([:foo, :bar], rehash.keys)
  end

  test "[]=" do
    rehash = Super::ReorderableHash.new
    rehash[:foo, {}] = 2
    rehash[:bar, {after: :foo}] = 1
    rehash[:baz, {before: :bar}] = 3
    rehash.order(:baz, after: :foo)
    assert_equal(%i[foo baz bar], rehash.keys)
  end

  test "to_h's keys are in order" do
    rehash = Super::ReorderableHash.new(foo: 1, bar: 2, baz: 3)
    assert_equal(%i[foo bar baz], rehash.to_h.keys)
  end

  test "it's enumerable" do
    rehash = Super::ReorderableHash.new(foo: 1, bar: 2, baz: 3)
    resulting = {}
    rehash.each do |key, value|
      resulting[key] = value
    end
    assert_equal({foo: 1, bar: 2, baz: 3}, resulting)
    assert_equal({foo: 1, bar: 2, baz: 3}, rehash.each.to_a.to_h)
  end
end
