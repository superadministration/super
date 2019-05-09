module Super
  class Error < StandardError
    class UnconfiguredConfiguration < Error; end
    class InvalidConfiguration < Error; end
  end
end
