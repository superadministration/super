# typed: false

require "test_helper"

class DestroyErrorTest < ActionDispatch::IntegrationTest
  def test_invalid_foreign_key
    Admin::ShipsController
      .any_instance
      .stubs(:destroy_record)
      .raises(ActiveRecord::InvalidForeignKey)

    delete(admin_ship_path(Ship.first))
    follow_redirect!
    assert_includes(response.body.gsub("&#39;", "'"), I18n.t("super.destroy_error.invalid_foreign_key"))
  end
end
