# typed: false

require "test_helper"

class BadgeTest < ActiveSupport::TestCase
  test %(Badge.new("text", style: :light)) do
    badge = build("text", style: :light)

    assert_includes(badge.attr("class"), Super::Badge::STYLES[:light])
    assert_includes(badge.attr("class"), Super::Badge.const_get(:COMMON_STYLES).join(" "))
  end

  test %(Badge.new("test", style: :doesnt_exist)) do
    assert_raises(Super::Error::Initialization) do
      build("text", style: :doesnt_exist)
    end
  end

  private

  def build(*args, **kwargs)
    badge = Super::Badge.new(*args, **kwargs)
    Nokogiri::HTML.fragment(badge.to_s).first_element_child
  end
end
