module Super
  class Error < StandardError
    class UnconfiguredConfiguration < Error; end
  end
end
