require "test_helper"

class ResetTest < ActiveSupport::TestCase
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
    imethods =
      ResetController.instance_methods -
      ActionController::Base.instance_methods -
      Rails.application.routes.url_helpers.methods
    assert_equal([], imethods)
  end

  def test_override_has_only_redefined_methods
    imethods =
      OverrideController.instance_methods -
      ActionController::Base.instance_methods -
      Rails.application.routes.url_helpers.methods
    assert_equal([:index], imethods)
  end
end
