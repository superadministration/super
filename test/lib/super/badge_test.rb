require "test_helper"

class BadgeTest < ActiveSupport::TestCase
  test %(Badge.new("text", style: :light)) do
    badge = build("text", style: :light)

    assert_includes(badge.attr("class"), Super::Badge::STYLES[:light])
  end

  test %(Badge.new("text", styles: :light)) do
    badge = build("text", styles: :light)

    assert_includes(badge.attr("class"), Super::Badge::STYLES[:light])
  end

  test %(Badge.new("text", styles: ["custom custom-1"])) do
    badge = build("text", styles: ["custom", "custom-1"])

    assert_includes(badge.attr("class"), "custom", "custom-1")
  end

  private

  def build(*args, **kwargs)
    badge = Super::Badge.new(*args, **kwargs)
    Nokogiri::HTML.fragment(badge.to_s).first_element_child
  end
end
