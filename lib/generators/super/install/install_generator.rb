module Super
  class InstallGenerator < Rails::Generators::Base
    source_root File.expand_path("templates", __dir__)

    def create_initializer
      copy_file "initializer.rb", "config/initializers/super.rb"
    end

    def create_base_admin_controller
      copy_file "base_controller.rb", "app/controllers/admin_controller.rb"
    end

    def create_directory_for_admin_controllers
      empty_directory "app/controllers/admin"
      create_file "app/controllers/admin/.keep", ""
    end

    def create_directory_for_dashboards_slash_setup
      empty_directory "app/super"
      create_file "app/super/.keep", ""
    end
  end
end
