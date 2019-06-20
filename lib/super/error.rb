module Super
  class Error < StandardError
    class UnconfiguredConfiguration < Error; end
    class InvalidConfiguration < Error; end
    class InvalidStyle < Error; end
    class InvalidPluginArgument < Error; end
  end
end
