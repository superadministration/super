module Super
  class ResourceGenerator < Rails::Generators::NamedBase
    source_root File.expand_path("templates", __dir__)

    def create_controller
      template("resources_controller.rb", "app/controllers/admin/#{file_path.pluralize}_controller.rb")
    end

    def create_controls
      template("resource_controls.rb", "app/controls/#{file_path}_controls.rb")
    end
  end
end
