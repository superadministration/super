# frozen_string_literal: true

require "super/partial/resolving"

module Super
  class Panel
    include Super::Partial::Resolving

    def initialize(*parts)
      if block_given?
        @parts = Array.new(yield)
      end

      @parts = parts
    end

    attr_reader :parts

    def resolve(template, block)
      @resolved_parts ||= resolve_for_rendering(template, parts, block)
      self
    end

    def resolved_parts
      @resolved_parts || []
    end

    def to_partial_path
      "super_panel"
    end
  end
end
