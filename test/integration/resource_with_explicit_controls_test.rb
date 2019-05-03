require "test_helper"

class ResourceWithExplicitControlsTest < CapybaraTest
  def test_browsing
    visit(admin_users_path)

    assert_equal(200, page.status_code)
    assert_content("Tahani")
  end
end
