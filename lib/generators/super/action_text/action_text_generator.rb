module Super
  class ActionTextGenerator < Rails::Generators::Base
    source_root File.expand_path("templates", __dir__)

    def copy_the_pack_files
      template(
        "pack_super_action_text.js",
        "app/javascript/packs/super/action_text.js"
      )
      template(
        "pack_super_action_text.css",
        "app/javascript/packs/super/action_text.css"
      )
    end

    def add_action_text_assets_to_config
      insert_into_file(
        "config/initializers/super.rb",
        "  c.javascripts.push(Super::Assets.webpacker(\"super/action_text\"))\n" \
        "  c.stylesheets.push(Super::Assets.webpacker(\"super/action_text\"))\n",
        before: /\bend\b/
      )
    end

    def remind_about_webpacker
      say "Make sure Webpacker is set up on your application!", :bold
      say "Run if needed: bundle exec rails webpacker:install"
    end
  end
end
