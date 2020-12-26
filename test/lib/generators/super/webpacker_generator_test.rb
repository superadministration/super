require "test_helper"
require "generators/super/webpacker/webpacker_generator"

class Super::WebpackerGeneratorTest < Rails::Generators::TestCase
  tests Super::WebpackerGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination

  def test_make_sure_the_file_looks_right
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

    assert_file("app/javascript/packs/super/application.js.erb", <<~JS)
      import Super from "<%= Super::Assets.dist("super", "super-frontend").join("application") %>";
      import "<%= Super::Assets.dist("super", "super-frontend").join("application.css") %>";
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
