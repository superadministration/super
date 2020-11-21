module Super
  # A container class for all internal errors thrown by this library
  #
  # See also `Super::ClientError`
  class Error < StandardError
    class UnconfiguredConfiguration < Error; end
    class InvalidConfiguration < Error; end
    class InvalidStyle < Error; end
    class InvalidPluginArgument < Error; end
    class ActionInquirerError < Error; end
    class LinkNotRegistered < Error; end
  end
end
