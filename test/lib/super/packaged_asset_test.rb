require "test_helper"

class PackagedAssetTest < ActiveSupport::TestCase
  setup do
    @package_json = Tempfile.new("package.json")
    @package_json_path = Pathname.new(@package_json.path)
  end
  teardown do
    begin
      @package_json.close
    rescue
      nil
    end
    begin
      @package_json.unlink
    rescue
      nil
    end
  end

  def package_json_write(contents)
    @package_json.open
    @package_json.write(contents)
    @package_json.close
  end

  test "it's true when the package.json is empty" do
    assert_equal(true, Super::PackagedAsset.version_matches_gem?(@package_json_path))
  end

  test "it's true when it's an exact match" do
    package_json_write({dependencies: {"@superadministration/super" => Super::VERSION}}.to_json)
    assert_equal(true, Super::PackagedAsset.version_matches_gem?(@package_json_path))
  end

  test "it's true when major, minor, and patch match" do
    package_json_write({dependencies: {"@superadministration/super" => "#{Super::VERSION}.1"}}.to_json)
    assert_equal(true, Super::PackagedAsset.version_matches_gem?(@package_json_path))
  end

  test "it's false when major, minor, or patch don't match" do
    package_json_write({dependencies: {"@superadministration/super" => "1#{Super::VERSION}"}}.to_json)
    assert_equal(false, Super::PackagedAsset.version_matches_gem?(@package_json_path))
  end
end

class PackagedAssetWarningTest < CapybaraTest
  setup { @original = Super::PackagedAsset.warning_message }
  teardown { Super::PackagedAsset.warning_message = @original }

  test "it shows the warning message when it's set" do
    Super::PackagedAsset.warning_message = I18n.t("super.mismatching_package_json_gemfile_versions")
    visit admin_members_url
    assert_text(I18n.t("super.mismatching_package_json_gemfile_versions"))
  end

  test "it doesn't show the warning message when it's not set" do
    Super::PackagedAsset.warning_message = nil
    visit admin_members_url
    assert_no_text(I18n.t("super.mismatching_package_json_gemfile_versions"))
  end
end
