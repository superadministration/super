module Super
  class ResourceGenerator < Rails::Generators::NamedBase
    source_root File.expand_path("templates", __dir__)

    def create_controller
      controller_subdir =
        if Super.configuration.controller_namespace.present?
          "#{Super.configuration.controller_namespace}/"
        else
          ""
        end

      template(
        "resources_controller.rb",
        "app/controllers/#{controller_subdir}#{file_path.pluralize}_controller.rb"
      )

      template("resource_dashboard.rb", "app/super/#{file_path}_dashboard.rb")
    end

    private

    def wrap_with_configured_module(&block)
      indentation_amount =
        if Super.configuration.controller_namespace.present?
          2
        else
          0
        end

      inner = capture(&block)
      inner = indent(inner, indentation_amount).chomp

      if Super.configuration.controller_namespace.present?
        concat("module #{Super.configuration.controller_namespace.camelize}\n")
      end

      concat(inner)
      concat("\n")

      if Super.configuration.controller_namespace.present?
        concat("end\n")
      end
    end

    def parent_controller_name
      if Super.configuration.controller_namespace.present?
        "#{Super.configuration.controller_namespace.camelize}Controller"
      else
        "AdminController"
      end
    end
  end
end
