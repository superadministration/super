# typed: true
# frozen_string_literal: true

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
          asset.send(:handler=, Handler.webpacker)
        end

        asset
      end
    end

    def self.use_sprockets(assets, grep: nil)
      assets = [assets] if !assets.kind_of?(Array)

      assets.map do |asset|
        grep_matches = grep && asset === grep
        if grep_matches || !grep
          asset.send(:handler=, Handler.sprockets)
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

      def ==(other)
        return false if handler != other.handler
        return false if path != other.path
        return false if arguments != other.arguments

        true
      end

      def ===(other)
        return true if path == other
        return true if other.is_a?(Regexp) && path.match?(other)
        return true if handler == other
        return true if handler.to_sym == other
        return true if handler.to_s == other

        false
      end

      private

      attr_writer :handler
    end

    def self.dist(gem_name, package_name)
      gem_name = gem_name.to_s

      @gem_paths ||= {}
      @gem_paths[gem_name] ||= Pathname.new(Gem.loaded_specs[gem_name].full_gem_path).expand_path
      gem_path = @gem_paths[gem_name]

      gem_path.join("frontend", package_name, "dist")
    end

    class Handler
      class << self
        # @return [Super::Assets::Handler]
        def auto
          sprockets_spec = gem_specification("sprockets")
          if sprockets_spec
            major = sprockets_spec.version.segments.first
            if major >= 2
              return sprockets
            end
          end

          webpacker_spec = gem_specification("webpacker")
          if webpacker_spec
            major = webpacker_spec.version.segments.first
            if major >= 4
              return webpacker
            end
          end

          none
        end

        # @return [Boolean]
        def sprockets_available?
          if !gem_specification("sprockets") || !defined?(Sprockets)
            return false
          end

          true
        end

        # @return [Gem::Specification, nil]
        def gem_specification(gem_name)
          Gem::Dependency.new(gem_name).matching_specs&.sort_by(&:version)&.first
        end
      end

      # @return [Super::Assets::Handler]
      def self.sprockets
        @sprockets ||= new(:sprockets)
      end

      # @return [Super::Assets::Handler]
      def self.webpacker
        @webpacker ||= new(:webpacker)
      end

      # @return [Super::Assets::Handler]
      def self.none
        @none ||= new(:none)
      end

      # @param asset_handler [Symbol]
      def initialize(asset_handler)
        @asset_handler = asset_handler
      end

      # @return [Boolean]
      def ==(other)
        to_sym == other.to_sym
      end

      # @return [Boolean]
      def sprockets?
        @asset_handler == :sprockets
      end

      # @return [Boolean]
      def webpacker?
        @asset_handler == :webpacker
      end

      # @return [Boolean]
      def none?
        @asset_handler == :none
      end

      # @return [Symbol]
      def to_sym
        @asset_handler
      end

      # @return [String]
      def to_s
        @asset_handler.to_s
      end
    end
  end
end
