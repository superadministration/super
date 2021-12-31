# frozen_string_literal: true

module Super
  class LinkBuilder
    def initialize(text, href, **options)
      @text = text
      @href = href
      @options = options
    end

    attr_reader :requirements

    def resolve(**kwargs)
      Link.new(
        into_value(@text, kwargs),
        into_value(@href, kwargs),
        **into_value(@options, kwargs),
      )
    end

    private

    def into_value(value_or_proc, kwargs)
      if value_or_proc.kind_of?(Proc)
        value_or_proc.call(**kwargs)
      else
        value_or_proc
      end
    end
  end
end
