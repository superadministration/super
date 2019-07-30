module Super
  class Assets
    def self.sprockets_available?
      Gem::Dependency.new("sprockets").matching_specs.any?
    end

    def self.auto
      @auto ||=
        if Gem::Dependency.new("sprockets", "~> 4.0").matching_specs.any?
          sprockets
        elsif Gem::Dependency.new("sprockets", "~> 3.0").matching_specs.any?
          sprockets
        elsif Gem::Dependency.new("sprockets", "~> 2.0").matching_specs.any?
          sprockets
        elsif Gem::Dependency.new("webpacker", "~> 4.0").matching_specs.any?
          webpacker
        elsif Gem::Dependency.new("webpacker", "~> 3.0").matching_specs.any?
          webpacker
        else
          none
        end
    end

    def self.sprockets
      new(:sprockets)
    end

    def self.webpacker
      new(:webpacker)
    end

    def self.none
      new(:none)
    end

    def initialize(asset_handler)
      @asset_handler = asset_handler
    end

    def sprockets?
      @asset_handler == :sprockets
    end

    def webpacker?
      @asset_handler == :webpacker
    end

    def none?
      @asset_handler == :none
    end
  end
end
