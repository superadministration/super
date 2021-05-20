require "test_helper"

class FilterIntegrationTest < CapybaraTest
  setup do
    skip if Rails::VERSION::MAJOR == 5 && Rails::VERSION::MINOR == 0

    @original_configuration = Super.configuration
    Super.instance_variable_set(:@configuration, @original_configuration.dup)
    Super.configuration.index_records_per_page = 20
  end

  teardown { Super.instance_variable_set(:@configuration, @original_configuration) }

  def test_filtering_via_equality
    visit admin_members_path

    assert_equal(Super.configuration.index_records_per_page, page.find_all("tbody tr").size)

    fill_in "q[f][name][contain][q]", with: "Jean-Luc Picard"
    click_button "Apply"

    assert_equal(1, page.find_all("tbody tr").size)
    assert(page.has_css?("table", text: "Jean-Luc Picard"))
    assert_equal("Jean-Luc Picard", page.find("#q_f_name_contain_q").value)
  end

  def test_filtering_via_contains
    visit admin_members_path
    fill_in "q[f][name][contain][q]", with: "O'Brien"
    click_button "Apply"

    assert_equal(2, page.find_all("tbody tr").size)
    assert(page.has_content?("Keiko O'Brien"))
    assert(page.has_content?("Miles O'Brien"))
    assert_equal("O'Brien", page.find("#q_f_name_contain_q").value)
  end
end
