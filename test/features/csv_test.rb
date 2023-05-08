# typed: false

require "test_helper"

class CsvTest < ActionDispatch::IntegrationTest
  test "get index csv gets a csv" do
    get admin_members_path(format: "csv")
    CSV.parse(response.body)
  end
end

class CsvDisabledTest < ActionDispatch::IntegrationTest
  controller(Admin::MembersController) do
    def csv_enabled?
      false
    end
  end

  test "get index csv redirects back to the index html" do
    get anonymous_path(format: "csv", something: "random")
    assert_redirected_to(anonymous_path(something: "random"))
  end
end
