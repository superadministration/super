# typed: false

require "test_helper"

class ResourceWithExplicitControlsTest < CapybaraTest
  def test_browsing
    visit(admin_members_path)
    assert_includes(200...300, page.status_code)
    assert_content("Jean-Luc")

    visit(admin_member_path(members(:picard)))
    assert_includes(200...300, page.status_code)
    assert_content("Jean-Luc")

    visit(new_admin_member_path)
    assert_includes(200...300, page.status_code)
    assert_content("Name")

    visit(edit_admin_member_path(members(:picard)))
    assert_includes(200...300, page.status_code)
    assert_content("Name")
  end

  def test_creation
    visit(admin_members_path)
    click_on("New")

    assert_difference -> { Member.all.size }, 1 do
      fill_in("Name", with: "Wesley Crusher", match: :first)
      select("ensign", from: "Rank")
      fill_in("Position", with: "Acting ensign")
      select(ships(:uss_enterprise_d).name, from: "Ship")
      click_on("Create Member")
    end
    assert_includes(200...300, page.status_code)
    assert_equal(admin_member_path(Member.find_by(name: "Wesley Crusher")), page.current_path)
  end

  def test_update
    visit(admin_members_path)
    within("#record-pk-#{members(:picard).id}") do
      click_on("Edit")
    end

    assert_difference(%(Member.where(name: "Locutus").size), 1) do
      fill_in("Name", with: "Locutus", match: :first)
      click_on("Update Member")
    end

    assert_includes(200...300, page.status_code)
    assert_equal(admin_member_path(Member.find_by(name: "Locutus")), page.current_path)
  end

  def test_delete
    visit(admin_members_path)
    assert_difference -> { Member.all.size }, -1 do
      within("#record-pk-#{members(:picard).id}") do
        click_on("Delete")
      end
    end

    assert_includes(200...300, page.status_code)
    assert_equal(admin_members_path, page.current_path)
  end
end
