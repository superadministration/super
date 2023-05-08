# typed: false

require "test_helper"

class ResetTest < ActiveSupport::TestCase
  class ControlController < ActionController::Base
  end

  class BaseController < Super::ApplicationController
  end

  class ResetController < BaseController
    include Super::Reset
  end

  class OverrideController < BaseController
    include Super::Reset

    def index
    end
  end

  def test_reset_doesnt_have_actions
    assert_controller_was_reset(ResetController)
  end

  def test_override_has_only_redefined_methods
    assert_controller_was_reset(OverrideController, publics: [:index])
  end

  private

  def assert_controller_was_reset(subject_controller, publics: [], privates: [])
    all_expected_public_methods = ControlController.instance_methods + publics
    all_actual_public_methods = subject_controller.instance_methods.sort
    assert_equal(all_expected_public_methods.sort, all_actual_public_methods)

    all_expected_private_methods = []
    all_actual_private_methods = ControlController.private_instance_methods - subject_controller.private_instance_methods
    assert_equal(all_expected_private_methods, all_actual_private_methods.sort)

    non_erased_methods =
      Super::SitewideController.private_instance_methods(false) +
      Super::FoundationController.private_instance_methods(false) +
      [:page_title]
    assert_equal(
      non_erased_methods.uniq.sort - [:_layout],
      subject_controller.private_instance_methods.sort - ControlController.private_instance_methods.sort
    )
  end
end

class ResetIntegrationTest < ActionDispatch::IntegrationTest
  controller(Super::ApplicationController) do
    include Super::Reset

    def index
    end
  end

  views["index.html.erb"] = <<~HTML
    <h1>Very Unique Text</h1>
  HTML

  test "that it loads" do
    get anonymous_path
    assert_select "h1", "Very Unique Text"
  end

  test "that method is undefined" do
    assert_raises(ActionView::Template::Error, /@view/) do
      get anonymou_path("show")
    end
  end
end
