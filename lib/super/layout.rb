require "super/partial/resolving"

module Super
  class Layout
    include Super::Partial::Resolving

    def initialize(headers: nil, asides: nil, mains: nil, footers: nil)
      @headers = Array(headers).compact
      @asides = Array(asides).compact
      @mains = Array(mains).compact
      @footers = Array(footers).compact
    end

    attr_reader :headers
    attr_reader :asides
    attr_reader :mains
    attr_reader :footers

    def to_partial_path
      "super_layout"
    end

    def resolve(template)
      @resolved_headers = resolve_for_rendering(template, headers, nil)
      @resolved_asides = resolve_for_rendering(template, asides, nil)
      @resolved_mains = resolve_for_rendering(template, mains, nil)
      @resolved_footers = resolve_for_rendering(template, footers, nil)
      self
    end

    def resolved_headers
      @resolved_headers || []
    end

    def resolved_asides
      @resolved_asides || []
    end

    def resolved_mains
      @resolved_mains || []
    end

    def resolved_footers
      @resolved_footers || []
    end
  end
end
