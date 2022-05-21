# frozen_string_literal: true

require "active_support/deprecation"

module Super
  module Useful
    class Deprecation
      VERSIONS = {
        "0.22" => ActiveSupport::Deprecation.new("0.22", "Super")
      }
      private_constant :VERSIONS

      def self.[](version)
        VERSIONS.fetch(version)
      end
    end
  end
end
