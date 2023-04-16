require "test_helper"

class Super::Useful::I19Test < ActiveSupport::TestCase
  test "build_chain" do
    result = Super::Useful::I19.build_chain("a", [1, 2, 3], "z")

    assert_equal(
      [
        :"a.1.2.3.z",
        :"a.1.2.z",
        :"a.1.z",
        :"a.z"
      ],
      result
    )
  end
end
