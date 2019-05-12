require "test_helper"

class PaginationTest < CapybaraTest
  setup do
    @original_index_resources_per_page = Super.configuration.index_resources_per_page
  end

  teardown do
    Super.configuration.index_resources_per_page = @original_index_resources_per_page
  end

  def test_three_users_on_first_page
    Super.configuration.index_resources_per_page = 3

    visit(admin_users_path)
    assert_equal(3, page.find_all("tbody tr").size)
  end

  def test_one_user_on_last_page
    Super.configuration.index_resources_per_page = 3

    visit(admin_users_path)
    click_on("2")
    assert_equal(1, page.find_all("tbody tr").size)
  end
end
