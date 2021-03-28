require "test_helper"
require "generators/super/install/install_generator"

class Super::InstallGeneratorTest < Rails::Generators::TestCase
  tests Super::InstallGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination
  setup do
    @original_configuration = Super.configuration
    Super.instance_variable_set(:@configuration, nil)
  end
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
      end
    RUBY
    assert_file("app/controllers/admin_controller.rb", <<~RUBY)
      class AdminController < Super::ApplicationController
      end
    RUBY
    assert_file("app/controllers/admin/.keep", "")
    assert_file("app/assets/config/manifest.js", "//= link super_manifest.js\n")

    assert_file("app/controllers/admin/README.md")
    cheat = File.read(File.expand_path("app/controllers/admin/README.md", destination_root))
    assert_includes(cheat, "#model()")
    refute_includes(cheat, "<!--")
  end

  def test_generator_correctly_sets_controller_namespace
    run_generator(["--controller-namespace", "badminton"])

    assert_file("config/initializers/super.rb", <<~RUBY)
      Super.configuration do |c|
        c.title = "My Admin Site"
        c.generator_module = "badminton"
      end
    RUBY
    assert_file("config/initializers/super.rb") do |contents|
      eval(contents)
      assert_equal("badminton", Super.configuration.generator_module)
    end

    assert_file("app/controllers/badminton_controller.rb", <<~RUBY)
      class BadmintonController < Super::ApplicationController
      end
    RUBY

    assert_file("app/controllers/badminton/.keep", "")
    assert_file("app/controllers/badminton/README.md")
  end

  def test_generator_correctly_sets_controller_namespace_if_explicitly_blank
    run_generator(["--controller-namespace", ""])

    assert_file("config/initializers/super.rb") do |contents|
      eval(contents)
      assert_equal("", Super.configuration.generator_module)
    end

    assert_file("app/controllers/admin_controller.rb", <<~RUBY)
      class AdminController < Super::ApplicationController
      end
    RUBY

    assert_directory("app/controllers")
    assert_file("app/controllers/README.md")
  end

  def test_removes_trailing_and_following_slashes
    run_generator(["--controller-namespace", "/one/", "--route-namespace", "/two/"])

    assert_file("config/initializers/super.rb", <<~RUBY)
      Super.configuration do |c|
        c.title = "My Admin Site"
        c.path = "/two"
        c.generator_as = "two"
        c.generator_module = "one"
      end
    RUBY
    assert_file("config/initializers/super.rb") do |contents|
      eval(contents)
    end

    assert_file("app/controllers/one_controller.rb", <<~RUBY)
      class OneController < Super::ApplicationController
      end
    RUBY
  end

  def test_controller_namespace_cannot_be_super
    assert_raises(Super::Error::ArgumentError) do
      run_generator(["--controller-namespace", "super"])
    end
  end
end
