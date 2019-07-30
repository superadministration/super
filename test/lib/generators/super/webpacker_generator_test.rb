require "test_helper"
require "generators/super/webpacker/webpacker_generator"

class Super::WebpackerGeneratorTest < Rails::Generators::TestCase
  tests Super::WebpackerGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination

  def test_make_sure_the_file_looks_right
    run_generator([])

    assert_file("app/javascript/packs/super/application.js.erb", <<~JS)
      import Super from "<%= Super::Assets.dist("super", "super-frontend").join("application") %>";
      import "<%= Super::Assets.dist("super", "super-frontend").join("application.css") %>";
    JS
  end
end
