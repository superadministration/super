require "test_helper"

class AcceptsNestedAttributesForManyTest < CapybaraTest
  selenium!

  def test_it_works
    visit(edit_admin_member_path(members(:riker)))

    click_on("Add Favorite thing")

    within_fieldset("Favorite thing") do
      fill_in("Name", with: "Trumpet")
    end

    assert_difference(-> { members(:riker).reload.favorite_things.size }, 1) do
      click_on("Update Member")
    end

    assert_equal(admin_member_path(members(:riker)), page.current_path)
    assert(page.has_content?("Trumpet"))
  end
end
