require "test_helper"
require "generators/super/webpacker/webpacker_generator"

class Super::WebpackerGeneratorTest < Rails::Generators::TestCase
  tests Super::WebpackerGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination
  teardown do
    package_path = Rails.root.join("package.json")
    yarn_path = Rails.root.join("yarn.lock")
    package_json =
      begin
        JSON.parse(package_path.read)
      rescue
        {}
      end
    if package_json.keys.size == 1 && package_json.dig("dependencies", "@superadministration/super")
      package_path.delete
      yarn_path.delete if yarn_path.exist?
    end
  end

  def test_make_sure_the_file_looks_right_webpacker_5_and_below
    Gem::Dependency.any_instance.stubs(:matching_specs).returns([])

    destination_root.join("config").mkdir
    destination_root.join("config", "initializers").mkdir
    destination_root.join("config", "initializers", "super.rb").write(<<~RUBY)
      Super.configuration do |c|
        c.title = "My Admin Site"
        c.controller_namespace = "admin"
        c.route_namespace = "admin"
      end
    RUBY

    run_generator([])

    assert_file("app/javascript/packs/super/application.js", <<~JS)
      import Super from "@superadministration/super";
      import "@superadministration/super/application.css";
    JS

    assert_file("config/initializers/super.rb", <<~RUBY)
      Super.configuration do |c|
        c.title = "My Admin Site"
        c.controller_namespace = "admin"
        c.route_namespace = "admin"
        c.javascripts = Super::Assets.use_webpacker(c.javascripts)
        c.stylesheets = Super::Assets.use_webpacker(c.stylesheets)
      end
    RUBY
  end

  def test_make_sure_the_file_looks_right_webpacker_6_and_up
    Gem::Dependency.any_instance.stubs(:matching_specs).returns([true])

    destination_root.join("config").mkdir
    destination_root.join("config", "initializers").mkdir
    destination_root.join("config", "initializers", "super.rb").write(<<~RUBY)
      Super.configuration do |c|
        c.title = "My Admin Site"
        c.controller_namespace = "admin"
        c.route_namespace = "admin"
      end
    RUBY

    run_generator([])

    assert_file("app/packs/entrypoints/super/application.js", <<~JS)
      import Super from "@superadministration/super";
      import "@superadministration/super/application.css";
    JS

    assert_file("config/initializers/super.rb", <<~RUBY)
      Super.configuration do |c|
        c.title = "My Admin Site"
        c.controller_namespace = "admin"
        c.route_namespace = "admin"
        c.javascripts = Super::Assets.use_webpacker(c.javascripts)
        c.stylesheets = Super::Assets.use_webpacker(c.stylesheets)
      end
    RUBY
  end
end
