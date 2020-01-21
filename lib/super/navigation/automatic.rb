module Super
  class Navigation
    # Traverses the defined Rails Routes and attempts to build a list of links.
    # This is used for building the nav bar on each admin page.
    class Automatic
      def initialize(route_namespace:)
        route_namespace = route_namespace.to_s

        if route_namespace.include?("/")
          raise "Can't be nested namespace"
        end

        @route_namespace = route_namespace
      end

      def each
        if !block_given?
          return enum_for(:each)
        end

        navigable_namespace_routes = Rails.application.routes.routes.select do |route|
          path_spec = route.path.spec

          next if route.verb != "GET"
          next if !path_spec.respond_to?(:right)
          next if path_spec.right.left.to_s != @route_namespace
          next if route.required_parts.any?
          next if route.defaults.empty?

          true
        end

        navigable_defaults = navigable_namespace_routes.map do |route|
          controller_name = route.defaults[:controller] + "_controller"
          _controller =
            begin
              controller_name.camelize.constantize
            rescue NameError
              warn("[super] Couldn't find controller: #{controller_name}")
              next
            end

          route.defaults
        end

        grouped_navigable_defaults =
          navigable_defaults.compact.uniq.group_by { |d| d[:controller] }

        grouped_navigable_defaults.each do |controller, defaults|
          actions = defaults.map { |d| [d[:action], d[:action]] }.to_h
          action = actions["index"] || actions["show"]

          next if action.nil?

          path =
            begin
              Rails.application.routes.url_for(
                controller: controller,
                action: action,
                only_path: true
              )
            rescue ActionController::UrlGenerationError
              next
            end

          yield(controller.split("/").last.humanize, path)
        end
      end
    end
  end
end
