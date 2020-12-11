module Super
  # @yield [Configuration]
  # @return [Configuration]
  def self.configuration
    @configuration ||= Configuration.new

    if block_given?
      yield(@configuration)
    end

    @configuration
  end

  # Allows setting global configuration
  #
  # ```ruby
  # Super.configuration do |c|
  #   c.title = "My Admin Site"
  # end
  # ```
  class Configuration
    module ConfigurationLogic # @api private
      def self.included(base)
        base.extend(ClassMethods)
      end

      def initialize
        self.class.defaults.each do |key, value|
          if value.respond_to?(:call)
            value = value.call
          end

          public_send("#{key}=", value)
        end

        Plugin::Registry.controller.use(prepend: Super::Pagination::ControllerMethods)
      end

      def configured?(attr)
        instance_variable_defined?("@#{attr}")
      end

      module ClassMethods
        def defaults
          @defaults ||= {}
        end

        def wraps
          @wraps ||= {}
        end

        def configure(attr, wrap: nil, enum: nil, **kwargs)
          if kwargs.key?(:default)
            defaults[attr] = kwargs[:default]
          end

          define_method(attr) do
            if !configured?(attr)
              raise Error::UnconfiguredConfiguration, "unconfigured: #{attr}"
            end

            result = instance_variable_get("@#{attr}")

            if wrap.nil?
              result
            else
              wrap.call(result)
            end
          end

          define_method("#{attr}=") do |value|
            if enum.is_a?(Array)
              if !enum.include?(value)
                raise Error::InvalidConfiguration,
                  "tried to set `#{attr}` to `#{value.inspect}`, " \
                  "expected: #{enum.join(", ")}"
              end
            end

            instance_variable_set("@#{attr}", value)
            value
          end
        end
      end
    end

    include ConfigurationLogic

    # @!attribute [rw]
    configure :title
    # @!attribute [rw]
    configure :index_records_per_page, default: 20
    # @!attribute [rw]
    configure :controller_namespace, default: "admin"
    # @!attribute [rw]
    configure :route_namespace, default: :admin, wrap: -> (val) { [val].flatten }
    # @!attribute [rw]
    configure :asset_handler, default: -> { Super::Assets.auto }

    def controller_plugins
      Plugin::Registry.controller
    end

    # @api private
    def path_parts(*parts)
      route_namespace + parts
    end
  end
end
