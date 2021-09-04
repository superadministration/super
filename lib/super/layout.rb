# frozen_string_literal: true

require "super/partial/resolving"

module Super
  class Layout
    include Super::Partial::Resolving

    def initialize(header: nil, aside: nil, main: nil, footer: nil)
      @header = header
      @aside = aside
      @main = main
      @footer = footer
    end

    attr_reader :header
    attr_reader :aside
    attr_reader :main
    attr_reader :footer

    def to_partial_path
      "layout"
    end
  end
end
