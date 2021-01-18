# frozen_string_literal: true

module Super
  # @yield [Configuration]
  # @return [Configuration]
  def self.configuration
    @configuration ||= Configuration.new

    if block_given?
      yield(@configuration)
    end

    @configuration
  end

  # Allows setting global configuration
  #
  # ```ruby
  # Super.configuration do |c|
  #   c.title = "My Admin Site"
  # end
  # ```
  class Configuration
    def initialize
      self.title = "Super Admin"
      self.index_records_per_page = 20
      self.controller_namespace = "admin"
      self.route_namespace = :admin

      controller_plugins.use(prepend: Super::Filter::ControllerMethods)
      controller_plugins.use(prepend: Super::Pagination::ControllerMethods)

      self.javascripts = [Super::Assets.auto("super/application")]
      self.stylesheets = [Super::Assets.auto("super/application")]
    end

    attr_accessor :title
    attr_accessor :index_records_per_page
    attr_accessor :controller_namespace
    attr_writer :route_namespace
    def route_namespace
      [@route_namespace].flatten
    end

    attr_accessor :javascripts
    attr_accessor :stylesheets

    def controller_plugins
      Plugin::Registry.controller
    end

    # @api private
    def path_parts(*parts)
      route_namespace + parts
    end
  end
end
