require "test_helper"

class ConfigurationTest < ActiveSupport::TestCase
  class Testing
    include Super::Configuration::ConfigurationLogic

    configure :no_modifiers
    configure :has_default, default: "i am the default"
    configure :has_enum, enum: [:valid, :also_valid]
  end

  def test_returns_value_if_configuration_is_set
    test = Testing.new
    test.no_modifiers = "hi"
    assert_equal("hi", test.no_modifiers)
  end

  def test_raise_error_if_configuration_unset
    test = Testing.new
    assert_raises(Super::Error::UnconfiguredConfiguration) do
      test.no_modifiers
    end
  end

  def test_default_value_when_unset
    test = Testing.new
    assert_equal("i am the default", test.has_default)
  end

  def test_default_value_with_override
    test = Testing.new
    test.has_default = "overridden"
    assert_equal("overridden", test.has_default)
  end

  def test_invalid_enum
    test = Testing.new
    assert_raises(Super::Error::InvalidConfiguration) do
      test.has_enum = :invalid
    end
  end

  def test_valid_enum
    test = Testing.new
    test.has_enum = :valid
    assert_equal(:valid, test.has_enum)
  end

  def test_unset_enum
    test = Testing.new
    assert_raises(Super::Error::UnconfiguredConfiguration) do
      test.has_enum
    end
  end
end
