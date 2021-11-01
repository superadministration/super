require "test_helper"

class BatchActionsTest < CapybaraTest
  selenium!

  test "sends the columns values as params[:batch]" do
    visit admin_members_path
    member_ids = Member.select(:id).order(:id).first(3).map(&:id)
    member_ids.each do |id|
      find("#batch-checkbox-#{id}", visible: :all).click
    end
    find("#batch-actions").click
    find_button("No-op").click

    assert_text(member_ids.map(&:to_s).join(", "))
  end

  test "submits but sends nothing when nothing is checked" do
    visit admin_members_path
    find("#batch-actions").click
    find_button("No-op").click

    assert_text(I18n.t("super.batch.none_error"))
  end
end
