module Super
  # A container class for all internal errors thrown by this library
  #
  # See also `Super::ClientError`
  class Error < StandardError
    # Error raised when some configuration is not set
    class UnconfiguredConfiguration < Error; end
    # Error raised when a configuration is set to a invalid value
    class InvalidConfiguration < Error; end
    # Error raised on problematic plugins, see `Super::Plugin`
    class InvalidPluginArgument < Error; end
    # Error raised on problematic ActionInquirer settings, see `Super::ActionInquirer`
    class ActionInquirerError < Error; end
    # Error raised when a `Super::Link` couldn't be found
    class LinkNotRegistered < Error; end
  end
end
