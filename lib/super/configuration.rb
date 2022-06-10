# typed: true
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

    # @!attribute [rw] title
    #   @return [String]
    config_accessor(:title) { "Super Admin" }

    # @!attribute [rw] index_records_per_page
    #   @return [Integer]
    config_accessor(:index_records_per_page) { 100 }

    # @!attribute [rw] javascripts
    #   @return [Array<Super::Assets::Asset>]
    config_accessor(:javascripts) do
      [Super::Assets.auto("super/application")]
    end

    # @!attribute [rw] stylesheets
    #   @return [Array<Super::Assets::Asset>]
    config_accessor(:stylesheets) do
      [Super::Assets.auto("super/application")]
    end

    # @!attribute [rw] path
    #   @return [String]
    config_accessor(:path) { "/admin" }

    # @!attribute [rw] generator_module
    #   @return [String]
    config_accessor(:generator_module) { "admin" }

    # @!attribute [rw] generator_as
    #   @return [String]
    config_accessor(:generator_as) { "admin" }

    def initialize
      controller_plugins.use(prepend: Super::Pagination::ControllerMethods)
    end

    # @return [Super::Plugin::Registry]
    def controller_plugins
      Plugin::Registry.controller
    end
  end
end
