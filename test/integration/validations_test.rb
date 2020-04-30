require "test_helper"

class ValidationsTest < CapybaraTest
  def test_validation_problems_shows_errors_on_create
    visit(new_admin_member_path)

    assert_difference -> { Member.all.size }, 0 do
      click_on("Create Member")
    end

    assert_includes(400...500, page.status_code)
    page.assert_text("Name can't be blank")
    page.assert_text("Rank can't be blank")
    page.assert_text("Position can't be blank")
    page.assert_text("Ship must exist")
  end

  def test_validation_problems_shows_errors_on_update
    visit(edit_admin_member_path(members(:picard)))

    assert_difference -> { Member.where(name: "Jean-Luc Picard").size }, 0 do
      fill_in("Name", with: "", match: :first)
      click_on("Update Member")
    end

    assert_includes(400...500, page.status_code)
    page.assert_text("Name can't be blank")
  end
end
