# typed: strict
# frozen_string_literal: true

module Super
  class PackagedAsset
    extend T::Sig

    VERSION_BEGINNING = T.let(/\A\d+\.\d+.\d+/.freeze, Regexp)

    class << self
      extend T::Sig
      sig { returns(T.nilable(Pathname)) }
      attr_reader :package_json_path

      sig { returns(T.nilable(T::Boolean)) }
      attr_accessor :version_matches_gem

      sig { params(value: T.nilable(Pathname)).returns(T.nilable(Pathname)) }
      def package_json_path=(value)
        @package_json_path = T.let(value, T.nilable(Pathname))
        self.version_matches_gem = nil
        @package_json_path
      end
    end

    sig { returns(T::Boolean) }
    def self.version_matches_gem?
      return T.must(version_matches_gem) if !version_matches_gem.nil?

      result =
        if package_json_path.nil?
          true
        else
          new(T.must(package_json_path)).matches_gem_version?
        end
      self.version_matches_gem = T.let(result, T.nilable(T::Boolean))
      T.must(version_matches_gem)
    end

    sig { params(package_json_path: Pathname).void }
    def initialize(package_json_path)
      @package_json_path = package_json_path
      @asset_version = T.let(nil, T.nilable(String))
      @asset_version_defined = T.let(false, T::Boolean)
      @full_asset_version = T.let(nil, T.nilable(String))
      @full_asset_version_defined = T.let(false, T::Boolean)
    end

    sig { returns(String) }
    def gem_version
      T.must(::Super::VERSION[VERSION_BEGINNING])
    end

    sig { returns(T.nilable(String)) }
    def asset_version
      return @asset_version if @asset_version_defined
      @asset_version_defined = true

      @asset_version =
        if full_asset_version
          T.must(full_asset_version)[VERSION_BEGINNING]
        end
    rescue
      @asset_version = nil
    end

    sig { returns(T::Boolean) }
    def matches_gem_version?
      return true if ENV.key?("SUPER_IGNORE_PACKAGE_JSON_VERSION")
      return true if asset_version.nil?

      asset_version == gem_version
    end

    private

    sig { returns(T.nilable(String)) }
    def full_asset_version
      return @full_asset_version if @full_asset_version_defined
      @full_asset_version_defined = true

      @full_asset_version =
        if @package_json_path.exist?
          JSON.parse(@package_json_path.read).dig("dependencies", "@superadministration/super")
        end
    rescue
      @full_asset_version = nil
    end
  end
end
