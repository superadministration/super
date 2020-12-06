require "super/controls/optional"
require "super/controls/required"
require "super/controls/steps"

module Super
  # A wrapper around the per-controller Controls classes. This class often
  # directly delegates to the per-controller classes, but it can also provide
  # some default implementation.
  class Controls
    include Required
    include Optional
    include Steps

    def initialize(actual)
      @actual = actual
    end

    attr_reader :actual

    private

    def default_for(method_name, *args, **kwargs)
      if @actual.respond_to?(method_name)
        if args.empty? && kwargs.empty?
          return @actual.public_send(method_name)
        elsif args.empty?
          return @actual.public_send(method_name, **kwargs)
        else
          return @actual.public_send(method_name, *args)
        end
      end

      yield
    end
  end
end
