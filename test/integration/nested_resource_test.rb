require "test_helper"

class NestedResourceTest < ActionDispatch::IntegrationTest
  test "a collection route loads" do
    get admin_member_favorite_things_path(members(:picard))
    assert_equal(200, response.status)
    assert_select("a", text: "New") do |matches|
      assert_equal(new_admin_member_favorite_thing_path(members(:picard)), matches.first.attr("href"))
    end
  end

  test "a member route loads" do
    get admin_favorite_thing_path(favorite_things(:spot))
    assert_equal(200, response.status)
    assert_select("a", text: "Edit") do |matches|
      assert_equal(edit_admin_favorite_thing_path(favorite_things(:spot)), matches.first.attr("href"))
    end
    assert_select("a", text: "Delete") do |matches|
      assert_equal(admin_favorite_thing_path(favorite_things(:spot)), matches.first.attr("href"))
    end
  end

  test "the new form has the correct link" do
    get new_admin_member_favorite_thing_path(members(:picard))
    assert_equal(200, response.status)
    doc = Nokogiri::HTML::Document.parse(response.body)
    assert_equal(admin_member_favorite_things_path(members(:picard)), doc.at_css("form").attr("action"))
  end

  test "the edit form has the correct link" do
    get edit_admin_favorite_thing_path(favorite_things(:spot))
    assert_equal(200, response.status)
    doc = Nokogiri::HTML::Document.parse(response.body)
    assert_equal(admin_favorite_thing_path(favorite_things(:spot)), doc.at_css("form").attr("action"))
  end

  test "pagination!" do
    (1..100).each do |n|
      members(:picard).favorite_things.create!(id: n, name: "The number #{n}")
    end
    get admin_member_favorite_things_path(members(:picard))
    assert_includes(response.body, "The number 100")
    get admin_member_favorite_things_path(members(:picard), page: 2)
    assert_includes(response.body, "Tea, earl grey, hot")
  end
end
