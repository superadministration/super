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
    include ActiveSupport::Configurable

    config_accessor(:title) { "Super Admin" }
    config_accessor(:index_records_per_page) { 20 }
    config_accessor(:javascripts) do
      [Super::Assets.auto("super/application")]
    end
    config_accessor(:stylesheets) do
      [Super::Assets.auto("super/application")]
    end

    config_accessor(:path) { "/admin" }
    config_accessor(:generator_module) { "admin" }
    config_accessor(:generator_as) { "admin" }

    def initialize
      controller_plugins.use(prepend: Super::Pagination::ControllerMethods)
    end

    def controller_plugins
      Plugin::Registry.controller
    end
  end
end
