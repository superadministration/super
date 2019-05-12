require "test_helper"

class ValidationsTest < CapybaraTest
  def test_validation_problems_shows_errors_on_create
    visit(new_admin_user_path)

    assert_difference -> { User.all.size }, 0 do
      click_on("Create User")
    end

    assert_includes(400...500, page.status_code)
    page.assert_text("Name can't be blank")
  end

  def test_validation_problems_shows_errors_on_update
    visit(edit_admin_user_path(users(:eleanor)))

    assert_difference -> { User.where(name: "Eleanor Shellstrop").size }, 0 do
      fill_in("Name", with: "")
      click_on("Update User")
    end

    assert_includes(400...500, page.status_code)
    page.assert_text("Name can't be blank")
  end
end
