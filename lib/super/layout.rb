module Super
  class Layout
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
  end
end
