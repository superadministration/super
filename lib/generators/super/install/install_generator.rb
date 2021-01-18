# frozen_string_literal: true

module Super
  class InstallGenerator < Rails::Generators::Base
    source_root File.expand_path("templates", __dir__)

    class_option :controller_namespace, type: :string, default: "admin",
      banner: "Specifies where to place generated admin controllers"
    class_option :route_namespace, type: :string, default: "admin",
      banner: "Specifies the route namespace for admin controllers"

    def create_initializer
      template("initializer.rb", "config/initializers/super.rb")
    end

    def create_base_admin_controller
      template(
        "base_controller.rb",
        "app/controllers/#{controller_namespace}_controller.rb",
        controller_namespace: controller_namespace
      )
    end

    def create_directory_for_admin_controllers
      if options["controller_namespace"].blank?
        empty_directory("app/controllers")
        return
      end

      empty_directory("app/controllers/#{controller_namespace}")
      create_file("app/controllers/#{controller_namespace}/.keep", "")
    end

    def copy_cheatsheet
      super_path = Pathname.new(Gem.loaded_specs["super"].full_gem_path).expand_path
      super_cheat_path = super_path.join("docs", "cheat.md")

      path =
        if options["controller_namespace"].present?
          "app/controllers/#{controller_namespace}/README.md"
        else
          "app/controllers/README.md"
        end

      create_file(path) do
        super_cheat_path.read.sub(%r{<!--.*?-->}m, "").strip + "\n"
      end
    end

    def setup_sprockets4_manifest
      append_to_file "app/assets/config/manifest.js", "//= link super_manifest.js\n"
    end

    private

    def controller_namespace
      if options["controller_namespace"].blank?
        "admin"
      else
        options["controller_namespace"]
      end
    end
  end
end
