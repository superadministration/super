require "test_helper"

class FilterTest < CapybaraTest
  def test_filtering_via_equality_and_contains
    visit admin_members_path

    assert_equal(Super.configuration.index_records_per_page, page.find_all("tbody tr").size)

    fill_in "q[name][q]", with: "Jean-Luc Picard"
    click_button "Filter"

    assert_equal(1, page.find_all("tbody tr").size)
    assert(page.has_css?("table", text: "Jean-Luc Picard"))
    assert_equal("Jean-Luc Picard", page.find("#q_name_q").value)

    fill_in "q[name][q]", with: "O'Brien"
    select "contains", from: "q[name][op]"
    click_button "Filter"

    assert_equal(2, page.find_all("tbody tr").size)
    assert(page.has_content?("Keiko O'Brien"))
    assert(page.has_content?("Miles O'Brien"))
    assert_equal("O'Brien", page.find("#q_name_q").value)
  end
end
