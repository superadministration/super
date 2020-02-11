module Super
  # A container class for all custom errors thrown by this library
  class Error < StandardError
    class UnconfiguredConfiguration < Error; end
    class InvalidConfiguration < Error; end
    class InvalidStyle < Error; end
    class InvalidPluginArgument < Error; end
    class ActionInquirerError < Error; end
    class LinkNotRegistered < Error; end

    class ClientError < Error; end
    class BadRequest < ClientError; end
    class Unauthorized < ClientError; end
    class Forbidden < ClientError; end
    class NotFound < ClientError; end
    class UnprocessableEntity < ClientError; end
  end
end
