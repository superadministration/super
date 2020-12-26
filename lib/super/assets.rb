module Super
  # Utilities for determining whether to use Sprockets or Webpacker
  class Assets
    def self.webpacker(path, **arguments)
      Asset.new(handler: Handler.webpacker, path: path, arguments: arguments)
    end

    def self.sprockets(path, **arguments)
      Asset.new(handler: Handler.sprockets, path: path, arguments: arguments)
    end

    def self.auto(path, **arguments)
      Asset.new(handler: Handler.auto, path: path, arguments: arguments)
    end

    def self.use_webpacker(assets, grep: nil)
      assets = [assets] if !assets.kind_of?(Array)

      assets.map do |asset|
        grep_matches = grep && asset === grep
        if grep_matches || !grep
          asset.instance_variable_set(:@handler, Handler.webpacker)
        end

        asset
      end
    end

    def self.use_sprockets(assets, grep: nil)
      assets = [assets] if !assets.kind_of?(Array)

      assets.map do |asset|
        grep_matches = grep && asset === grep
        if grep_matches || !grep
          asset.instance_variable_set(:@asset_handler, Handler.sprockets)
        end

        asset
      end
    end

    class Asset
      def initialize(handler:, path:, arguments:)
        @handler = handler
        @path = path
        @arguments = arguments
      end

      attr_reader :handler
      attr_reader :path
      attr_reader :arguments

      def ===(other)
        return true if path == other
        return true if other.is_a?(Regexp) && path.match?(other)
        return true if handler == other
        return true if handler.to_sym == other
        return true if handler.to_s == other

        false
      end
    end

    def self.dist(gem_name, package_name)
      gem_name = gem_name.to_s

      @gem_paths ||= {}
      @gem_paths[gem_name] ||= Pathname.new(Gem.loaded_specs[gem_name].full_gem_path).expand_path
      gem_path = @gem_paths[gem_name]

      gem_path.join("frontend", package_name, "dist")
    end

    class Handler
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

      def self.sprockets_available?
        Gem::Dependency.new("sprockets").matching_specs.any? && defined?(Sprockets)
      end

      def self.sprockets
        @sprockets ||= new(:sprockets)
      end

      def self.webpacker
        @webpacker ||= new(:webpacker)
      end

      def self.none
        @none ||= new(:none)
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

      def to_sym
        @asset_handler
      end

      def to_s
        @asset_handler.to_s
      end
    end
  end
end
