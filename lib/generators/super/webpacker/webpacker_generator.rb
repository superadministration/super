module Super
  class WebpackerGenerator < Rails::Generators::Base
    source_root File.expand_path("templates", __dir__)

    def copy_the_pack_file
      template(
        "pack_super_application.js.erb",
        "app/javascript/packs/super/application.js.erb"
      )
    end

    def set_asset_handler_to_webpacker
      insert_into_file(
        "config/initializers/super.rb",
        "  c.javascripts = Super::Assets.use_webpacker(c.javascripts)\n" \
        "  c.stylesheets = Super::Assets.use_webpacker(c.stylesheets)\n",
        before: /\bend\b/
      )
    end

    def remind_about_erb
      say "Make sure ERB is set up for Webpacker!", :bold
      say "Run if needed: bundle exec rails webpacker:install:erb"
    end
  end
end
