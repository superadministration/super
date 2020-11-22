require "test_helper"

class FormTest < ActionDispatch::IntegrationTest
  def test_form_for_with_builder
    post(admin_members_path, params: { member: { name: "" } })
    assert_equal(0, css_select(".field_with_errors").size)
  end
end
