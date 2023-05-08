# typed: false
# frozen_string_literal: true

module Super
  class Navigation
    def initialize
      @builder = Builder.new
      yield @builder
    end

    def definition
      return @definition if instance_variable_defined?(:@definition)

      searcher = RouteFormatterButReallySearcher.new
      inspector = ActionDispatch::Routing::RoutesInspector.new(Rails.application.routes.routes)
      inspector.format(searcher)
      all_matches = searcher.matches
      unused_matches = all_matches.each_with_object({}) { |match, hash| hash[match] = true }

      defs = validate_and_determine_explicit_links(@builder.build, unused_matches)
      @definition = expand_directives(defs, all_matches, unused_matches.keys)
    end

    private

    def validate_and_determine_explicit_links(definition, unused_links)
      definition.each do |link_or_menu_or_rest|
        if link_or_menu_or_rest.is_a?(Super::Link)
          unused_links.delete(link_or_menu_or_rest.href)
        elsif link_or_menu_or_rest.is_a?(Menu)
          link_or_menu_or_rest.links.each do |link_or_rest|
            if link_or_rest.is_a?(Menu)
              raise Super::Error::ArgumentError, "Navigation menus can't be nested"
            end

            if link_or_rest.is_a?(Link)
              unused_links.delete(link_or_rest.href)
            end
          end
        end
      end
    end

    def expand_directives(defs, all_hrefs, rest_hrefs)
      defs.flat_map do |link_or_menu_or_rest|
        if link_or_menu_or_rest.is_a?(Menu)
          link_or_menu_or_rest.links = link_or_menu_or_rest.links.flat_map do |link_or_rest|
            if link_or_rest == ALL
              linkify_hrefs(all_hrefs)
            elsif link_or_rest == REST
              linkify_hrefs(rest_hrefs)
            else
              link_or_rest
            end
          end

          link_or_menu_or_rest
        elsif link_or_menu_or_rest == ALL
          linkify_hrefs(all_hrefs)
        elsif link_or_menu_or_rest == REST
          linkify_hrefs(rest_hrefs)
        else
          link_or_menu_or_rest
        end
      end
    end

    def linkify_hrefs(hrefs)
      hrefs.map do |href|
        Super::Link.new(href.split("/").last.humanize, href)
      end
    end

    ALL = Object.new
    REST = Object.new
    Menu = Struct.new(:title, :links)

    class Builder
      def initialize
        @links = []
        @menu_level = 0
      end

      def build
        @links
      end

      def link(model, **kwargs)
        text = model.model_name.human.pluralize
        parts = Super::Link.polymorphic_parts(model)

        @links.push(Super::Link.new(text, parts, **kwargs))
        self
      end

      def link_to(*args, **kwargs)
        @links.push(Super::Link.new(*args, **kwargs))
        self
      end

      def menu(title)
        if @menu_level > 0
          raise Super::Error::ArgumentError, "Navigation menus can't be nested"
        end

        begin
          @menu_level += 1
          original_links = @links
          @links = []
          yield
          menu_links = @links
        ensure
          @links = original_links
          @menu_level -= 1
        end

        @links.push(Menu.new(title, menu_links))
        self
      end

      def rest
        @links.push(REST)
        self
      end

      def all
        @links.push(ALL)
        self
      end
    end

    class RouteFormatterButReallySearcher
      def initialize(route_namespace: Super.configuration.path)
        @route_namespace = route_namespace.strip.gsub(%r{\A/+}, "").gsub(%r{/+\z}, "").strip
        @route_namespace = "/#{@route_namespace}/"
        @matches = []
      end

      def matches
        @matches.map do |route|
          route[:path].sub(/\(.*\)\Z/, "")
        end
      end

      def section(routes)
        @matches += routes.select do |route|
          next false unless route[:verb] == "GET" || route[:verb] == ""
          next false unless route[:path].start_with?(@route_namespace)
          next false if route[:path].include?("/:")
          next false if route[:reqs].end_with?("#new")

          true
        end
      end

      def header(routes)
      end

      def no_routes(routes, filter)
      end

      def result
      end

      def section_title(title)
      end
    end
  end
end
