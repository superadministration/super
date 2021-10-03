# frozen_string_literal: true

module Super
  class PackagedAsset
    VERSION_BEGINNING = /\A\d+\.\d+.\d+/.freeze

    class << self
      attr_accessor :warning_message
    end

    def self.comparable_super_version
      ::Super::VERSION[VERSION_BEGINNING]
    end

    def self.version_matches_gem?(package_json_path)
      return true if ENV.key?("SUPER_IGNORE_PACKAGE_JSON_VERSION")

      asset = new(package_json_path)

      return true if !asset.comparable_version

      asset.comparable_version == comparable_super_version
    end

    def initialize(package_json_path)
      @package_json_path = package_json_path
    end

    def full_version
      if instance_variable_defined?(:@full_version)
        return @full_version
      end

      @full_version = JSON.parse(@package_json_path.read).dig("dependencies", "@superadministration/super")
    rescue
      @full_version = nil
    end

    def comparable_version
      if instance_variable_defined?(:@asset_version)
        return @asset_version
      end

      @asset_version = full_version[VERSION_BEGINNING]
    rescue
      @asset_version = nil
    end
  end
end
