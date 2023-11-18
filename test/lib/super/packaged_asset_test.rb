# typed: true

require "test_helper"

class PackagedAssetTest < ActiveSupport::TestCase
  setup do
    @original = Super::PackagedAsset.package_json_path
    @tempfile = Tempfile.new("package.json")
    Super::PackagedAsset.package_json_path = Pathname.new(@tempfile.path)
  end
  teardown do
    Super::PackagedAsset.package_json_path = @original
    begin
      @tempfile.close
    rescue
    end
    begin
      @tempfile.unlink
    rescue
    end
  end

  test "it's true when the package.json is empty" do
    assert_equal(true, Super::PackagedAsset.version_matches_gem?)
  end

  test "it's true when it's an exact match" do
    @tempfile.write({dependencies: {"@superadministration/super" => Super::VERSION}}.to_json)
    @tempfile.rewind
    assert_equal(true, Super::PackagedAsset.version_matches_gem?)
  end

  test "it's true when major, minor, and patch match" do
    @tempfile.write({dependencies: {"@superadministration/super" => "#{Super::VERSION}.1"}}.to_json)
    @tempfile.rewind
    assert_equal(true, Super::PackagedAsset.version_matches_gem?)
  end

  test "it's false when major, minor, or patch don't match" do
    @tempfile.write({dependencies: {"@superadministration/super" => "1#{Super::VERSION}"}}.to_json)
    @tempfile.rewind
    assert_equal(false, Super::PackagedAsset.version_matches_gem?)
  end
end

class PackagedAssetWarningTest < CapybaraTest
  setup do
    @original = Super::PackagedAsset.package_json_path
    @tempfile = Tempfile.new("package.json")
    Super::PackagedAsset.package_json_path = Pathname.new(@tempfile.path)
  end
  teardown do
    Super::PackagedAsset.package_json_path = @original
    begin
      @tempfile.close
    rescue
    end
    begin
      @tempfile.unlink
    rescue
    end
  end

  test "it shows the warning message when versions mismatch" do
    @tempfile.write(JSON.dump({dependencies: {"@superadministration/super" => "1#{Super::VERSION}"}}))
    @tempfile.rewind
    visit admin_members_url
    assert_text(I18n.t("super.mismatching_package_json_gemfile_versions"))
  end

  test "it doesn't show the warning message when it's not set" do
    @tempfile.write(JSON.dump({dependencies: {"@superadministration/super" => Super::VERSION}}))
    @tempfile.rewind
    visit admin_members_url
    assert_no_text(I18n.t("super.mismatching_package_json_gemfile_versions"))
  end
end
