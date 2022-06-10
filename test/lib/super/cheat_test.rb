require "test_helper"
require "super/cheat"

class CheatTest < ActiveSupport::TestCase
  def test_controller_has_everything
    instance = Super::Cheat.new
    out, err = capture_io do
      instance.controller
    end
    recorded_methods = out.lines.map(&:strip).to_set
    all_instance_methods =
      Super::ApplicationController.instance_methods(true) +
      Super::ApplicationController.private_instance_methods(true) -
      ActionController::Base.instance_methods(true) -
      ActionController::Base.private_instance_methods(true) -
      [:_layout, :_generate_paths_by_default]
    all_instance_methods.uniq!

    assert(recorded_methods.delete?("== Super::ApplicationController"), "couldn't find the header")

    all_instance_methods.each do |method_name|
      expected = "##{method_name}"
      params = Super::ApplicationController.instance_method(method_name).parameters
      expected_params =
        if params.empty?
          ""
        else
          param_strings = params.map do |(type, name)|
            if type == :req
              name.to_s
            elsif type == :opt
              "#{name} = nil"
            else
              "TODO #{name}"
            end
          end
          "(#{param_strings.join(", ")})"
        end
      expected = "##{method_name}#{expected_params}"

      assert(recorded_methods.delete?(expected), "couldn't find #{expected} in #{recorded_methods}")
    end
    assert_empty(recorded_methods)
    assert_equal("", err)
  end
end
