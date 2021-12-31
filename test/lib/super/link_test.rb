require "test_helper"

class LinkTest < ActiveSupport::TestCase
  test "it does I18n" do
    i18n = [
      :"super.admin.members.actions.new",
      {
        default: [
          :"super.admin.actions.new",
          :"super.actions.new",
        ]
      }
    ]

    link = Super::Link.new(i18n, "/admin/members/new", class: "foo")
    assert_equal("New", link.text)
    assert_equal("/admin/members/new", link.href)
    assert_equal({ class: "foo" }, link.options)
  end
end
