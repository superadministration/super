module Super
  class Error < StandardError
    class UnconfiguredConfiguration < Error; end
    class InvalidConfiguration < Error; end
    class InvalidStyle < Error; end
    class InvalidPluginArgument < Error; end

    class ClientError < Error; end
    class BadRequest < ClientError; end
    class Unauthorized < ClientError; end
    class Forbidden < ClientError; end
    class NotFound < ClientError; end
    class UnprocessableEntity < ClientError; end
  end
end
