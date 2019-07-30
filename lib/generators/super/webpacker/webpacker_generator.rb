module Super
  class WebpackerGenerator < Rails::Generators::Base
    source_root File.expand_path("templates", __dir__)

    def copy_the_pack_file
      template(
        "pack_super_application.js.erb",
        "app/javascript/packs/super/application.js.erb"
      )
    end

    def remind_about_erb
      say "Make sure ERB is set up for Webpacker!", :bold
      say "Run if needed: rails webpacker:install:erb", :bold
    end
  end
end
