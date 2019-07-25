require "test_helper"
require "generators/super/resource/resource_generator"

class Super::ResourceGeneratorTest < Rails::Generators::TestCase
  tests Super::ResourceGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination

  def test_generator_creates_expected_files
    run_generator(["ship"])

    assert_file("app/controllers/admin/ships_controller.rb")
    assert_file("app/controls/ship_controls.rb")
  end
end
