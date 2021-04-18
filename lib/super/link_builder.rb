# frozen_string_literal: true

module Super
  class LinkBuilder
    def initialize(text, href, **options)
      @text = text
      @href = href
      @options = options
      @requirements = []
      @requirements += gather_requirements(text)
      @requirements += gather_requirements(href)
      @requirements += gather_requirements(options)

      unknown_arguments = @requirements - known_requirements
      if unknown_arguments.any?
        raise Error::ArgumentError, "Unknown arguments: #{unknown_arguments.join(", ")}"
      end
    end

    attr_reader :requirements

    def to_s(default_options: nil, **kwargs)
      resolve(**kwargs).to_s(default_options: default_options)
    end

    def resolve(**kwargs)
      Link.new(
        into_value(@text, kwargs),
        into_value(@href, kwargs),
        **into_value(@options, kwargs),
      )
    end

    private

    def known_requirements
      %i[params record].freeze
    end

    def gather_requirements(value_or_proc)
      return [] if !value_or_proc.is_a?(Proc)

      requirements =
        value_or_proc
          .parameters
          .select { |(kind, name)| kind = :keyreq }
          .map(&:last)
    end

    def into_value(value_or_proc, kwargs)
      if value_or_proc.kind_of?(Proc)
        value_or_proc.call(**kwargs)
      else
        value_or_proc
      end
    end
  end
end
