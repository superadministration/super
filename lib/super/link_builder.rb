# typed: true
# frozen_string_literal: true

module Super
  class LinkBuilder
    # @!method text(&block)
    #   @return [Super::LinkBuilder]
    # @!method process_text(&block)
    #   @return [Super::LinkBuilder]
    # @!method href(&block)
    #   @return [Super::LinkBuilder]
    # @!method process_href(&block)
    #   @return [Super::LinkBuilder]
    # @!method options(&block)
    #   @return [Super::LinkBuilder]
    # @!method process_options(&block)
    #   @return [Super::LinkBuilder]
    %i[text href options].each do |method_name|
      class_eval(<<~RUBY, __FILE__, __LINE__ + 1)
        def #{method_name}(&block)
          @#{method_name} = block
          self
        end

        def process_#{method_name}(&block)
          @process_#{method_name} = block
          self
        end
      RUBY
    end

    def resolve(**kwargs)
      raise Super::Error::IncompleteBuilder, "LinkBuilder requires that #text is set" if @text.nil?
      raise Super::Error::IncompleteBuilder, "LinkBuilder requires that #href is set" if @href.nil?

      @options ||= -> (**) { {} }
      @process_text ||= -> (t) { t }
      @process_href ||= -> (h) { h }
      @process_options ||= -> (o) { o }

      Super::Link.new(
        @process_text.call(@text.call(**kwargs)),
        @process_href.call(@href.call(**kwargs)),
        **@process_options.call(@options.call(**kwargs))
      )
    end
  end
end
