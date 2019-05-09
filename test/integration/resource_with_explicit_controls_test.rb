require "test_helper"

class ResourceWithExplicitControlsTest < CapybaraTest
  def test_browsing
    visit(admin_users_path)
    assert_includes(200...300, page.status_code)
    assert_content("Tahani")

    visit(admin_user_path(users(:tahani)))
    assert_includes(200...300, page.status_code)
    assert_content("Tahani")

    visit(new_admin_user_path)
    assert_includes(200...300, page.status_code)
    assert_content("Name")

    visit(edit_admin_user_path(users(:jason)))
    assert_includes(200...300, page.status_code)
    assert_content("Name")
  end

  def test_creation
    visit(admin_users_path)
    click_on("New User")

    assert_difference -> { User.all.size }, 1 do
      fill_in("Name", with: "Michael")
      click_on("Create User")
    end
    assert_includes(200...300, page.status_code)
    assert_equal(admin_user_path(User.find_by(name: "Michael")), page.current_path)
  end

  def test_update
    visit(admin_users_path)
    within("#resource-pk-#{users(:eleanor).id}") do
      click_on("Edit")
    end

    assert_difference -> { User.where(name: "Fake Eleanor").size }, 1 do
      fill_in("Name", with: "Fake Eleanor")
      click_on("Update User")
    end

    assert_includes(200...300, page.status_code)
    assert_equal(admin_user_path(User.find_by(name: "Fake Eleanor")), page.current_path)
  end

  def test_delete
    janet = User.create!(name: "Janet")

    visit(admin_users_path)
    assert_difference -> { User.all.size }, -1 do
      within("#resource-pk-#{janet.id}") do
        click_on("Delete")
      end
    end

    assert_includes(200...300, page.status_code)
    assert_equal(admin_users_path, page.current_path)
  end
end
