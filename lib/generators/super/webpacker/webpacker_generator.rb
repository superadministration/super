# frozen_string_literal: true

module Super
  class WebpackerGenerator < Rails::Generators::Base
    source_root File.expand_path("templates", __dir__)

    def copy_the_pack_file
      path =
        if Gem::Dependency.new("webpacker", ">= 6.0.0.beta2", "!= 6.0.0.pre1", "!= 6.0.0.pre2").matching_specs.any?
          "app/packs/entrypoints/super/application.js.erb"
        else
          "app/javascript/packs/super/application.js.erb"
        end

      template("pack_super_application.js.erb", path)
    end

    def set_asset_handler_to_webpacker
      insert_into_file(
        "config/initializers/super.rb",
        "  c.javascripts = Super::Assets.use_webpacker(c.javascripts)\n" \
        "  c.stylesheets = Super::Assets.use_webpacker(c.stylesheets)\n",
        before: /^end\b/
      )
    end

    def remind_about_erb
      say "Make sure ERB is set up for Webpacker!", :bold
      say "Run if needed: bundle exec rails webpacker:install:erb"
    end
  end
end
