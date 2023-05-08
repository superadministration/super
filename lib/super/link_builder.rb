# typed: true
# frozen_string_literal: true

module Super
  class LinkBuilder
    def text(&block)
      @text = block
      self
    end

    def process_text(&block)
      @process_text = block
      self
    end

    def href(&block)
      @href = block
      self
    end

    def process_href(&block)
      @process_href = block
      self
    end

    def options(&block)
      @options = block
      self
    end

    def process_options(&block)
      @process_options = block
      self
    end

    def resolve(**kwargs)
      raise Super::Error::IncompleteBuilder, "LinkBuilder requires that #text is set" if @text.nil?
      raise Super::Error::IncompleteBuilder, "LinkBuilder requires that #href is set" if @href.nil?

      @options ||= ->(**) { {} }
      @process_text ||= ->(t) { t }
      @process_href ||= ->(h) { h }
      @process_options ||= ->(o) { o }

      Super::Link.new(
        @process_text.call(@text.call(**kwargs)),
        @process_href.call(@href.call(**kwargs)),
        **@process_options.call(@options.call(**kwargs))
      )
    end
  end
end
