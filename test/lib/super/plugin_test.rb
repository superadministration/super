require "test_helper"

class PluginTest < ActiveSupport::TestCase
  class SomeSuperclass
  end

  class SubclassDefinedFirstInclude < SomeSuperclass
    include Super::Pluggable.new(:subclass_defined_first_include)
  end

  class SubclassDefinedFirstPrepend < SomeSuperclass
    include Super::Pluggable.new(:subclass_defined_first_prepend)
  end

  module CoolPlugin
  end

  Super::PluginRegistry.include_to(:subclass_defined_first_include, CoolPlugin)
  Super::PluginRegistry.prepend_to(:subclass_defined_first_prepend, CoolPlugin)

  Super::PluginRegistry.include_to(:subclass_defined_after_include, CoolPlugin)
  Super::PluginRegistry.prepend_to(:subclass_defined_after_prepend, CoolPlugin)

  class SubclassDefinedAfterInclude < SomeSuperclass
    include Super::Pluggable.new(:subclass_defined_after_include)
  end

  class SubclassDefinedAfterPrepend < SomeSuperclass
    include Super::Pluggable.new(:subclass_defined_after_prepend)
  end

  def test_class_defined_first
    assert_equal(
      [SubclassDefinedFirstInclude, CoolPlugin],
      SubclassDefinedFirstInclude.ancestors[0..1]
    )

    assert_equal(
      [CoolPlugin, SubclassDefinedFirstPrepend],
      SubclassDefinedFirstPrepend.ancestors[0..1]
    )
  end

  def test_plugin_defined_first
    assert_equal(
      [SubclassDefinedAfterInclude, CoolPlugin],
      SubclassDefinedAfterInclude.ancestors[0..1]
    )

    assert_equal(
      [CoolPlugin, SubclassDefinedAfterPrepend],
      SubclassDefinedAfterPrepend.ancestors[0..1]
    )
  end
end
