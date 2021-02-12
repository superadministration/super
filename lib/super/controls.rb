# frozen_string_literal: true

require "super/controls/optional"
require "super/controls/required"
require "super/controls/steps"
require "super/controls/view"

module Super
  # The base Controls class. Most parts of Super can be configured by
  # customizing its methods.
  class Controls
    include Required
    include Optional
    include Steps
    include View
  end
end
