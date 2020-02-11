module Super
  # Links have three required attributes that are passed directly into Rails'
  # `link_to` helper
  class Link
    def self.resolve(link)
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
        new: -> (params:) {
          new(
            "New",
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :new,
              only_path: true
            )
          )
        },
        index: -> (params:) {
          new(
            "Index",
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :index,
              only_path: true
            )
          )
        },
        show: -> (resource, params:) {
          new(
            "View",
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :show,
              id: resource,
              only_path: true
            )
          )
        },
        edit: -> (resource, params:) {
          new(
            "Edit",
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :edit,
              id: resource,
              only_path: true
            )
          )
        },
        destroy: -> (resource, params:) {
          new(
            "Delete",
            Rails.application.routes.url_for(
              controller: params[:controller],
              action: :destroy,
              id: resource,
              only_path: true
            ),
            method: :delete,
            data: { confirm: "Really delete?" }
          )
        },
      }
    end

    def initialize(text, href, **options)
      @text = text
      @href = href
      @options = options
    end

    attr_reader :text
    attr_reader :href
    attr_reader :options
  end
end
