module Super
  class Pluggable < Module
    def initialize(registry_name)
      @registry_name = registry_name
    end

    def included(base)
      super

      PluginRegistry.base_set(@registry_name, base)

      plugins = PluginRegistry.plugins_for(@registry_name)

      plugins.each do |klass, method_name|
        base.public_send(method_name, klass)
      end
    end
  end

  class PluginRegistry
    class << self
      def include_to(name, klass)
        plugin_push(name.to_sym, :include, klass)
      end

      def prepend_to(name, klass)
        plugin_push(name.to_sym, :prepend, klass)
      end

      def plugins_for(name)
        name = name.to_sym

        plugins.fetch(name) { {} }
      end

      def base_set(name, klass)
        name = name.to_sym

        if !klass.kind_of?(Class)
          raise Error::InvalidPluginArgument,
            "Received `#{klass}` which must be a class"
        end

        bases[name] = klass

        true
      end

      def base_get(name)
        name = name.to_sym

        bases[name]
      end

      private

      def plugin_push(name, method_name, klass)
        if ![:include, :prepend].include?(method_name)
          raise Error::InvalidPluginArgument,
            "Received `#{method_name.inspect}`, must be either :include or :prepend"
        end

        if !klass.kind_of?(Module)
          raise Error::InvalidPluginArgument,
            "Received `#{klass}` which must be a module"
        end

        plugins[name] ||= {}
        plugins[name][klass] = method_name

        base = base_get(name)

        if base
          base.public_send(method_name, klass)
        end

        true
      end

      def plugins
        @plugins ||= {}
      end

      def bases
        @bases ||= {}
      end
    end
  end
end
