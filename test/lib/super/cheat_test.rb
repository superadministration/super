require "test_helper"
require "super/cheat"

class CheatTest < ActiveSupport::TestCase
  def test_controls_has_everything
    instance = Super::Cheat.new
    out, err = capture_io do
      instance.controls
    end
    recorded_methods = out.lines.map(&:strip).to_set
    all_instace_methods = Super::Controls.instance_methods(true) - Object.instance_methods

    assert(recorded_methods.delete?("== Super::Controls"), "couldn't find the header. #{recorded_methods}")
    all_instace_methods.each do |method_name|
      expected = "##{method_name}"
      params = Super::Controls.instance_method(method_name).parameters
      expected_params =
        if params.empty?
          ""
        else
          "(#{params.map { |(type, name)| type == :req ? name.to_s : "#{name}:" }.join(", ")})"
        end
      expected = "##{method_name}#{expected_params}"

      assert(recorded_methods.delete?(expected), "couldn't find #{expected} in #{recorded_methods}")
    end
    assert_empty(recorded_methods)
    assert_equal("", err)
  end
end
