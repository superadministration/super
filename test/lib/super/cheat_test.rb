require "test_helper"
require "super/cheat"

class CheatTest < ActiveSupport::TestCase
  def test_controls
    instance = Super::Cheat.new
    out, err = capture_io do
      instance.controls
    end

    assert_includes(out, "#model")
    assert_includes(out, "#title")
    assert_includes(out, "#load_records")
    assert_includes(out, "#index_view")
    assert_equal("", err)
  end
end
