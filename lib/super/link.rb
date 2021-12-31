# frozen_string_literal: true

module Super
  # Links have three required attributes that are passed directly into Rails'
  # `link_to` helper
  class Link
    def self.find_all(*links)
      links.map { |link| find(link) }
    end

    def self.find(link)
      if link.kind_of?(self)
        return link
      end

      if registry.key?(link)
        return registry[link]
      end

      raise Error::LinkNotRegistered, "Unknown link `#{link}`"
    end

    def self.registry
      @registry ||= {
        new: LinkBuilder.new(
          -> (params:) {
            keys = Super::Useful::I19.build_chain(
              "super",
              params[:controller].split("/"),
              "actions.new"
            )
            Super::Useful::I19.chain_to_i18n(keys)
          },
          -> (params:) {
            {
              controller: params[:controller],
              action: :new,
              only_path: true
            }
          }
        ),
        index: LinkBuilder.new(
          -> (params:) {
            keys = Super::Useful::I19.build_chain(
              "super",
              params[:controller].split("/"),
              "actions.index"
            )
            Super::Useful::I19.chain_to_i18n(keys)
          },
          -> (params:) {
            {
              controller: params[:controller],
              action: :index,
              only_path: true
            }
          }
        ),
        show: LinkBuilder.new(
          -> (params:, **) {
            keys = Super::Useful::I19.build_chain(
              "super",
              params[:controller].split("/"),
              "actions.show"
            )
            Super::Useful::I19.chain_to_i18n(keys)
          },
          -> (record:, params:) {
            {
              controller: params[:controller],
              action: :show,
              id: record,
              only_path: true
            }
          }
        ),
        edit: LinkBuilder.new(
          -> (params:, **) {
            keys = Super::Useful::I19.build_chain(
              "super",
              params[:controller].split("/"),
              "actions.edit"
            )
            Super::Useful::I19.chain_to_i18n(keys)
          },
          -> (record:, params:) {
            {
              controller: params[:controller],
              action: :edit,
              id: record,
              only_path: true
            }
          }
        ),
        destroy: LinkBuilder.new(
          -> (params:, **) {
            keys = Super::Useful::I19.build_chain(
              "super",
              params[:controller].split("/"),
              "actions.destroy"
            )
            Super::Useful::I19.chain_to_i18n(keys)
          },
          -> (record:, params:) {
            {
              controller: params[:controller],
              action: :destroy,
              id: record,
              only_path: true
            }
          },
          method: :delete,
          data: { confirm: "Really delete?" }
        ),
      }
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
