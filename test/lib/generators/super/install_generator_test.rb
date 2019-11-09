require "test_helper"
require "generators/super/install/install_generator"

class Super::InstallGeneratorTest < Rails::Generators::TestCase
  tests Super::InstallGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination
  setup { @original_configuration = Super.configuration }
  teardown { Super.instance_variable_set(:@configuration, @original_configuration) }
  setup do
    mkdir_p(File.join(destination_root, "app/assets/config"))
    File.write(File.join(destination_root, "app/assets/config/manifest.js"), "")
  end

  def test_generator_runs_correctly_with_no_args
    assert_no_file("config/initializers/super.rb")
    assert_no_file("app/controllers/admin_controller.rb")
    assert_no_file("app/controllers/admin/.keep")

    run_generator

    assert_file("config/initializers/super.rb", <<~RUBY)
      Super.configuration do |c|
        c.title = "My Admin Site"
        c.controller_namespace = "admin"
        c.route_namespace = "admin"
      end
    RUBY
    assert_file("app/controllers/admin_controller.rb", <<~RUBY)
      class AdminController < Super::ApplicationController
      end
    RUBY
    assert_file("app/controllers/admin/.keep", "")
    assert_file("app/assets/config/manifest.js", "//= link super_manifest.js\n")
  end

  def test_generator_correctly_sets_controller_namespace
    run_generator(["--controller-namespace", "badminton"])

    assert_file("config/initializers/super.rb") do |contents|
      eval(contents)
      assert_equal("badminton", Super.configuration.controller_namespace)
    end

    assert_file("app/controllers/badminton_controller.rb", <<~RUBY)
      class BadmintonController < Super::ApplicationController
      end
    RUBY

    assert_file("app/controllers/badminton/.keep", "")
  end

  def test_generator_correctly_sets_controller_namespace_if_explicitly_blank
    run_generator(["--controller-namespace", ""])

    assert_file("config/initializers/super.rb") do |contents|
      eval(contents)
      assert_equal("", Super.configuration.controller_namespace)
    end

    assert_file("app/controllers/admin_controller.rb", <<~RUBY)
      class AdminController < Super::ApplicationController
      end
    RUBY

    assert_directory("app/controllers")
  end
end
