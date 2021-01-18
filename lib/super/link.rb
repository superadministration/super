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
        new: new(
          "New",
          -> (params:) {
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :new,
              only_path: true
            )
          }
        ),
        index: new(
          "Index",
          -> (params:) {
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :index,
              only_path: true
            )
          }
        ),
        show: new(
          "View",
          -> (record:, params:) {
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :show,
              id: record,
              only_path: true
            )
          }
        ),
        edit: new(
          "Edit",
          -> (record:, params:) {
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :edit,
              id: record,
              only_path: true
            )
          }
        ),
        destroy: new(
          "Delete",
          -> (record:, params:) {
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :destroy,
              id: record,
              only_path: true
            )
          },
          method: :delete,
          data: { confirm: "Really delete?" }
        ),
      }
    end

    def initialize(text, href, **options)
      @text = text
      @href = href
      @options = options
    end

    def to_s(default_options: nil, **proc_arguments)
      default_options ||= {}
      ActionController::Base.helpers.link_to(
        value(text, proc_arguments),
        value(href, proc_arguments),
        default_options.deep_merge(value(options, proc_arguments))
      )
    end

    private

    attr_reader :text
    attr_reader :href
    attr_reader :options

    def value(proc_or_value, proc_arguments)
      if proc_or_value.kind_of?(Proc)
        proc_or_value.call(**proc_arguments)
      else
        proc_or_value
      end
    end
  end
end
