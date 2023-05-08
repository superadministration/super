# typed: true
# frozen_string_literal: true

require "rails/generators/resource_helpers"

module Super
  class ResourceGenerator < Rails::Generators::NamedBase
    include Rails::Generators::ResourceHelpers
    source_root File.expand_path("templates", __dir__)

    check_class_collision suffix: "Controller"

    class_option :skip_routes, type: :boolean, desc: "Don't add routes to config/routes.rb."

    def initialize(*)
      super

      controller_namespace = Super.configuration.generator_module
      if controller_namespace.present?
        controller_name =
          if controller_namespace.include?("/")
            "#{controller_namespace}/#{name}"
          else
            "#{controller_namespace}::#{name}"
          end
        self.options = options.dup
        options[:model_name] = name
        options.freeze
        assign_names!(name)
        assign_controller_names!(controller_name.pluralize)
      else
        assign_names!(name)
        assign_controller_names!(name.pluralize)
      end
    end

    def create_controller
      template(
        "resources_controller.rb",
        File.join("app/controllers", controller_class_path, "#{controller_file_name}_controller.rb")
      )
    end

    def create_route_namespace
      data = route_scope
      return if data.nil?
      return if File.read(File.join(destination_root, "config", "routes.rb")).include?(data)

      inject_into_file(
        "config/routes.rb",
        "#{data}\nend\n".indent(2),
        after: /^Rails\.application\.routes\.draw\b.*$\r?\n\r?/,
        verbose: true,
        force: false
      )
    end

    def add_admin_route
      data = route_scope

      if data.nil?
        route("resources :#{file_name.pluralize}")
      else
        inject_into_file(
          "config/routes.rb",
          "resources :#{file_name.pluralize}\n".indent(4),
          after: /#{data}.*$\r?\n\r?/,
          verbose: true,
          force: false
        )
      end
    end

    private

    def parent_controller_name
      controller_namespace.presence || "admin"
    end

    def controller_namespace
      Super.configuration.generator_module.strip.gsub(%r{\A/+}, "").gsub(%r{/+\z}, "").strip.underscore
    end

    def route_scope
      return nil if no_scope?

      if use_scope?
        kwargs = []
        kwargs.push(%(path: "/#{g_path}")) if g_path.present?
        kwargs.push(%(module: "#{g_module}")) if g_module.present?
        kwargs.push(%(as: "#{g_as}")) if g_as.present?
        return %(scope #{kwargs.join(", ")} do)
      end

      %(namespace :#{g_module} do)
    end

    def use_scope?
      return true if !same?
      return true if g_module.include?("/")
      return true if g_path.include?("/")

      false
    end

    def no_scope?
      g_module.blank? && g_path.blank? && g_as.blank?
    end

    def same?
      g_module == g_path && g_path == g_as
    end

    def g_module
      normalized_scope_part(Super.configuration.generator_module || "")
    end

    def g_path
      normalized_scope_part(Super.configuration.path || "")
    end

    def g_as
      normalized_scope_part(Super.configuration.generator_as || "")
    end

    def normalized_scope_part(part)
      part.strip.gsub(%r{\A/+}, "").gsub(%r{/+\z}, "").strip
    end
  end
end
