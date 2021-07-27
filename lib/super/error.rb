# frozen_string_literal: true

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
    # Error raised when rendering if `@view` wasn't set by the controller
    class NothingToRender < Error
      def initialize(basename)
        super(
          "Super's built-in `#{basename}.html.erb` requires `@view` to be set " \
          "by the controller, but it wasn't set"
        )
      end
    end
    # Error raised when something wasn't initalized correctly, and if there isn't
    # a more specific error
    class Initalization < Error; end
    class ArgumentError < Error; end
    class AlreadyRegistered < Error; end
    class AlreadyTranscribed < Error; end
    class NotImplementedError < Error; end

    class Enum < Error
      class ImpossibleValue < Enum; end
      class ArgumentError < Enum; end
      class UndefinedCase < Enum; end
    end
  end
end
