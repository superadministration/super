# typed: true

require "test_helper"

class Super::Useful::EnumTest < ActiveSupport::TestCase
  ENUM = Super::Useful::Enum.new(1, 2, 3)

  def test_all_cases_covered
    ENUM
      .case(1)
      .when(1) {}
      .when(2) {}
      .when(3) {}
      .result
  end

  def test_value_is_not_enum
    assert_raise(Super::Error::Enum::ImpossibleValue) do
      ENUM.case(4)
    end
    assert_raise(Super::Error::Enum::ImpossibleValue) do
      ENUM.case(1).when(4) {}
    end
  end

  def test_not_all_whens
    assert_raise(Super::Error::Enum::UndefinedCase) do
      ENUM.case(1).when(1) {}.result
    end
  end

  def test_when_without_block
    assert_raise(Super::Error::ArgumentError) do
      ENUM.case(1).when(1)
    end
  end
end
