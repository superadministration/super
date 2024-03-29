# typed: true
# frozen_string_literal: true

module Super
  # These methods could be useful for any Super controller, resourceful or not.
  class FoundationController < ActionController::Base
    private

    # @return [Super::ActionInquirer]
    helper_method def current_action
      @current_action ||=
        ActionInquirer.new(
          ActionInquirer.default_for_resources,
          params[:action]
        )
    end

    # @return [void]
    def with_current_action(action)
      original = @current_action
      @current_action = ActionInquirer.new(
        ActionInquirer.default_for_resources,
        action
      )
      yield
    ensure
      @current_action = original
    end
  end
end
