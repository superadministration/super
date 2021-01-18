require "test_helper"

class Super::Test < ActiveSupport::TestCase
  test "truth" do
    assert_kind_of Module, Super
  end
end
