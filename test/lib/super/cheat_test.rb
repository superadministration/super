require "test_helper"
require "super/cheat"

class CheatTest < ActiveSupport::TestCase
  def test_controller_has_everything
    instance = Super::Cheat.new
    out, err = capture_io do
      instance.controller
    end
    recorded_methods = out.lines.map(&:strip).to_set
    all_instace_methods =
      Super::SubstructureController.private_instance_methods -
      ActionController::Base.private_instance_methods -
      [:_layout, :_generate_paths_by_default]

    assert(recorded_methods.delete?("== Super::ApplicationController"), "couldn't find the header in #{recorded_methods}")
    all_instace_methods.each do |method_name|
      expected = "##{method_name}"
      params = Super::ApplicationController.instance_method(method_name).parameters
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
