# typed: false

require "test_helper"

class ActionInquirerTest < ActiveSupport::TestCase
  def test_match_action
    inquirer = Super::ActionInquirer.new(Super::ActionInquirer.default_for_resources, :index)

    assert_equal(true, inquirer.index?)
    assert_equal(false, inquirer.show?)
    assert_equal(false, inquirer.new?)
    assert_equal(false, inquirer.edit?)
    assert_equal(false, inquirer.create?)
    assert_equal(false, inquirer.update?)
    assert_equal(false, inquirer.destroy?)

    inquirer.action = :destroy

    assert_equal(false, inquirer.index?)
    assert_equal(false, inquirer.show?)
    assert_equal(false, inquirer.new?)
    assert_equal(false, inquirer.edit?)
    assert_equal(false, inquirer.create?)
    assert_equal(false, inquirer.update?)
    assert_equal(true, inquirer.destroy?)
  end

  def test_match_read_write_category
    inquirer = Super::ActionInquirer.new(Super::ActionInquirer.default_for_resources, :index)

    assert_equal(true, inquirer.read?)
    assert_equal(false, inquirer.write?)
    assert_equal(false, inquirer.delete?)

    inquirer.action = :destroy

    assert_equal(false, inquirer.read?)
    assert_equal(true, inquirer.write?)
    assert_equal(true, inquirer.delete?)
  end

  def test_match_collection_member_category
    inquirer = Super::ActionInquirer.new(Super::ActionInquirer.default_for_resources, :index)
    assert_equal(true, inquirer.collection?)
    assert_equal(false, inquirer.member?)

    inquirer.action = :show
    assert_equal(false, inquirer.collection?)
    assert_equal(true, inquirer.member?)
  end

  def test_respond_to
    inquirer = Super::ActionInquirer.new(Super::ActionInquirer.default_for_resources, :index)

    assert_equal(true, inquirer.respond_to?(:index?))
    assert_equal(true, inquirer.respond_to?(:show?))
    assert_equal(true, inquirer.respond_to?(:create?))
    assert_equal(true, inquirer.respond_to?(:new?))
    assert_equal(true, inquirer.respond_to?(:update?))
    assert_equal(true, inquirer.respond_to?(:edit?))
    assert_equal(true, inquirer.respond_to?(:destroy?))

    assert_equal(true, inquirer.respond_to?(:read?))
    assert_equal(true, inquirer.respond_to?(:write?))
    assert_equal(true, inquirer.respond_to?(:delete?))

    assert_equal(false, inquirer.respond_to?(:index))
  end
end
