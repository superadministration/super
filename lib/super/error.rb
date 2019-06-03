module Super
  class Error < StandardError
    class UnconfiguredConfiguration < Error; end
    class InvalidConfiguration < Error; end
    class InvalidStyle < Error; end
  end
end
