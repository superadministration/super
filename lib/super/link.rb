# typed: false
# frozen_string_literal: true

module Super
  # Links have three required attributes that are passed directly into Rails'
  # `link_to` helper
  class Link
    def self.find_all(*links)
      links.map { |link| find(link) }
    end

    def self.find(link)
      if registry.key?(link)
        found = registry[link]

        if found.is_a?(LinkBuilder)
          return found.dup
        else
          return found
        end
      end

      raise Error::LinkNotRegistered, "Unknown link `#{link}`"
    end

    def self.registry
      @registry ||= {}.tap do |reg|
        reg[:new] = LinkBuilder.new
          .text { |params:| Super::Useful::I19.i18n_with_fallback("super", params[:controller].split("/"), "actions.new") }
          .href { |params:| { controller: params[:controller], action: :new, only_path: true } }
          .freeze
        reg[:index] = LinkBuilder.new
          .text { |params:| Super::Useful::I19.i18n_with_fallback("super", params[:controller].split("/"), "actions.index") }
          .href { |params:| { controller: params[:controller], action: :index, only_path: true } }
          .freeze
        reg[:show] = LinkBuilder.new
          .text { |params:, **| Super::Useful::I19.i18n_with_fallback("super", params[:controller].split("/"), "actions.show") }
          .href { |params:, record:| { controller: params[:controller], action: :show, id: record, only_path: true } }
          .freeze
        reg[:edit] = LinkBuilder.new
          .text { |params:, **| Super::Useful::I19.i18n_with_fallback("super", params[:controller].split("/"), "actions.edit") }
          .href { |params:, record:| { controller: params[:controller], action: :edit, id: record, only_path: true } }
          .freeze
        reg[:destroy] = LinkBuilder.new
          .text { |params:, **| Super::Useful::I19.i18n_with_fallback("super", params[:controller].split("/"), "actions.destroy") }
          .href { |params:, record:| { controller: params[:controller], action: :destroy, id: record, only_path: true } }
          .options { |**| { method: :delete, data: { confirm: "Really delete?" } } }
          .freeze
      end
    end

    def self.polymorphic_parts(*parts_tail)
      parts_head = Super.configuration.path.strip.gsub(%r{\A/+}, "").gsub(%r{/+\z}, "").strip.split("/")
      parts_head.map { |part| part.is_a?(String) ? part.to_sym : part } + parts_tail
    end

    # The first argument should be the text of the link. If it's an array,
    # it'll send it directly into `I18n.t`
    def initialize(text, href, **options)
      @text = text
      @href = href
      @options = options
    end

    attr_reader :options

    def text
      if @text.is_a?(Array)
        *head, tail = @text
        if !tail.is_a?(Hash)
          head.push(tail)
          tail = {}
        end

        @text = I18n.t(*head, **tail)
        return @text
      end

      @text
    end

    def href
      if @href.is_a?(String)
        return @href
      end

      if @href.is_a?(Hash)
        @href = Rails.application.routes.url_for(**@href)
        return @href
      end

      @href = Super::Compatability.polymorphic_path_container.polymorphic_path(@href)
    end

    def to_partial_path
      "link"
    end

    def ==(other)
      self.class == other.class && text == other.text && href == other.href && options == other.options
    end
  end
end
