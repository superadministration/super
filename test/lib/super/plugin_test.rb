require "test_helper"

class PluginTest < ActiveSupport::TestCase
  module A; end

  module B; end

  module C; end

  module D; end

  def test_ordering
    expected_one_of = [
      [D, B, A, C],
      [D, B, C, A],
      [B, D, A, C],
      [B, D, C, A],
      [B, A, D, C],
      [B, C, D, A],
      [B, A, C, D],
      [B, C, A, D]
    ]

    10.times do
      registry = Super::Plugin::Registry.new
      actions = [
        -> { registry.insert_before(C, include: B) },
        -> { registry.insert_before(A, include: B) },
        -> { registry.use(include: D) }
      ]

      while actions.any?
        action = actions.delete_at(rand(actions.length))
        action.call
      end

      assert_includes(expected_one_of, registry.classes_ordered)
    end
  end

  def test_use_appends
    registry = Super::Plugin::Registry.new
    registry.use(include: A)
    registry.use(include: B)
    registry.use(include: C)
    registry.use(include: D)
    assert_equal([A, B, C, D], registry.classes_ordered)
  end
end
