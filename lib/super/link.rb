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
          "New",
          -> (params:) {
            {
              controller: params[:controller],
              action: :new,
              only_path: true
            }
          }
        ),
        index: LinkBuilder.new(
          "Index",
          -> (params:) {
            {
              controller: params[:controller],
              action: :index,
              only_path: true
            }
          }
        ),
        show: LinkBuilder.new(
          "View",
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
          "Edit",
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
          "Delete",
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

    def initialize(text, href, **options)
      @text = text
      @href = href
      @options = options
    end

    attr_reader :text
    attr_reader :options

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

    def to_s(default_options: nil, **)
      default_options ||= {}
      ActionController::Base.helpers.link_to(
        text,
        href,
        default_options.deep_merge(options)
      )
    end

    def ==(other)
      self.class == other.class && text == other.text && href == other.href && options == other.options
    end
  end
end
