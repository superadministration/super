require "test_helper"

class FilterIntegrationTest < CapybaraTest
  setup do
    skip if Rails::VERSION::MAJOR == 5 && Rails::VERSION::MINOR == 0
  end

  controller(Admin::MembersController) do
    def records_per_page
      20
    end
  end

  def test_filtering_via_equality
    visit "/anonymous"

    assert_equal(20, page.find_all("tbody tr").size)

    fill_in "f[name][contain][q]", with: "Jean-Luc Picard"
    click_button "Apply"

    assert_equal(1, page.find_all("tbody tr").size)
    assert(page.has_css?("table", text: "Jean-Luc Picard"))
    assert_equal("Jean-Luc Picard", page.find("#f_name_contain_q").value)
  end

  def test_filtering_via_contains
    visit "/anonymous"
    fill_in "f[name][contain][q]", with: "O'Brien"
    click_button "Apply"

    assert_equal(2, page.find_all("tbody tr").size)
    assert(page.has_content?("Keiko O'Brien"))
    assert(page.has_content?("Miles O'Brien"))
    assert_equal("O'Brien", page.find("#f_name_contain_q").value)
  end
end

class FilterFrontendIntegrationTest < CapybaraTest
  selenium!

  def test_filtering_via_timestamp
    members(:picard).update!(created_at: Time.utc(2020, 1, 1, 0, 0, 0))
    browser_tz("America/New_York") do
      visit admin_members_path
      find_field("f_created_at_between_q1").click
      set_date!(members(:picard).created_at.in_time_zone("America/New_York") + 1.day)
      set_time!(members(:picard).created_at.in_time_zone("America/New_York") + 1.day)
      click_button "Apply"
      assert_equal(1, page.find_all("tbody tr").size)
      assert(page.has_content?("Jean-Luc Picard"))
      assert_equal((members(:picard).created_at + 1.day).iso8601(3), page.find("#f_created_at_between_q1").value)
    end
  end
end
