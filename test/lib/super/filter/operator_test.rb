# typed: true

require "test_helper"

class FilterOperatorTest < ActiveSupport::TestCase
  def test_can_change_operator_behavior
    operator = Super::Filter::Operator.new("hello", "Hi") { |r, c| raise "uh oh" }
    assert_raise("uh oh") { operator.behavior.call(Ship.all, "name") }
    operator.behavior { |r, c| raise "yay" }
    assert_raise("yay") { operator.behavior.call(Ship.all, "name") }
  end

  def test_checks_behavior_definition
    assert_raise(Super::Error::ArgumentError) { Super::Filter::Operator.new("hello", "Hi") {} }
    assert_raise(Super::Error::ArgumentError) { Super::Filter::Operator.new("hello", "Hi") { |foo:, bar:| } }
    Super::Filter::Operator.new("hello", "Hi") { |foo, bar| }
    assert_raise(Super::Error::ArgumentError) { Super::Filter::Operator.new("hello", "Hi") { |foo, bar, baz| } }
    Super::Filter::Operator.new("hello", "Hi") { |foo, bar, baz:| }
    Super::Filter::Operator.new("hello", "Hi") { |foo, bar, baz:, now:| }
    Super::Filter::Operator.new("hello", "Hi") { |foo, bar, baz:, now:, what:| }
  end
end
