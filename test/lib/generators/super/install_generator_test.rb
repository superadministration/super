require "test_helper"
require "generators/super/install/install_generator"

class Super::InstallGeneratorTest < Rails::Generators::TestCase
  tests Super::InstallGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination

  def test_generator_runs_correctly_with_no_args
    assert_no_file("config/initializers/super.rb")
    assert_no_file("app/controllers/admin_controller.rb")
    assert_no_file("app/controllers/admin/.keep")
    assert_no_file("app/super/.keep")

    run_generator

    assert_file("config/initializers/super.rb", <<~RUBY)
      Super.configuration do |c|
        c.title = "My Admin Site"
      end
    RUBY
    assert_file("app/controllers/admin_controller.rb", <<~RUBY)
      class AdminController < Super::ApplicationController
      end
    RUBY
    assert_file("app/controllers/admin/.keep", "")
    assert_file("app/super/.keep", "")
  end
end
