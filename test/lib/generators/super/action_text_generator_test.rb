require "test_helper"
require "generators/super/action_text/action_text_generator"

class Super::ActionTextGeneratorTest < Rails::Generators::TestCase
  tests Super::ActionTextGenerator
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

    assert_file("app/javascript/packs/super/action_text.js", <<~JS)
      import * as ActiveStorage from "@rails/activestorage"
      ActiveStorage.start()
      require("trix")
      require("@rails/actiontext")
    JS

    assert_file("app/javascript/packs/super/action_text.css", <<~CSS)
      @import "trix/dist/trix";

      /* This is the SCSS that the ActionText installation generator adds, compiled to CSS */
      .trix-content .attachment-gallery > action-text-attachment,
      .trix-content .attachment-gallery > .attachment {
        flex: 1 0 33%;
        padding: 0 0.5em;
        max-width: 33%; }
      .trix-content .attachment-gallery.attachment-gallery--2 > action-text-attachment,
      .trix-content .attachment-gallery.attachment-gallery--2 > .attachment,
      .trix-content .attachment-gallery.attachment-gallery--4 > action-text-attachment,
      .trix-content .attachment-gallery.attachment-gallery--4 > .attachment {
        flex-basis: 50%;
        max-width: 50%; }
      .trix-content action-text-attachment .attachment {
        padding: 0 !important;
        max-width: 100% !important; }

      /* This is for getting Tailwind to work with Trix */
      .trix-content ul {
        list-style-type: disc; }
      .trix-content ol {
        list-style-type: decimal; }
    CSS

    assert_file("config/initializers/super.rb", <<~RUBY)
      Super.configuration do |c|
        c.title = "My Admin Site"
        c.controller_namespace = "admin"
        c.route_namespace = "admin"
        c.javascripts.push(Super::Assets.webpacker("super/action_text"))
        c.stylesheets.push(Super::Assets.webpacker("super/action_text"))
      end
    RUBY
  end
end
