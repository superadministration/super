require "test_helper"

class ErrorFlashMessageTest < CapybaraTest
  def test_default_error_message
    Admin::ShipsController.any_instance.stubs(:index).raises(Super::Error::BadRequest)

    visit(admin_ships_path)

    assert(page.has_content?("Bad request"))
    assert_equal(400, page.status_code)
  end

  def test_custom_error_message
    Admin::ShipsController
      .any_instance
      .stubs(:index)
      .raises(Super::Error::Unauthorized, "Hello!")

    visit(admin_ships_path)

    assert(page.has_content?("Hello!"))
    assert_equal(401, page.status_code)
  end
end
