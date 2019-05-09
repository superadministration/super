module Super
  def self.configuration
    @configuration ||= Configuration.new

    if block_given?
      yield(@configuration)
    end

    @configuration
  end

  module ConfigurationLogic
    def self.included(base)
      base.extend(ClassMethods)
    end

    def configured?(attr)
      instance_variable_defined?("@#{attr}")
    end

    module ClassMethods
      def configure(attr, default: nil, wrap: nil)
        define_method(attr) do
          result =
            if configured?(attr)
              instance_variable_get("@#{attr}")
            elsif !default.nil?
              default
            else
              raise Error::UnconfiguredConfiguration, "unconfigured: #{attr}"
            end

          if wrap.nil?
            result
          else
            wrap.call(result)
          end
        end

        attr_writer(attr)
      end
    end
  end

  class Configuration
    include ConfigurationLogic

    configure :title
    configure :index_resources_per_page, default: 20
    configure :admin_namespace, default: :admin, wrap: -> (val) { [val].flatten }

    def path_parts(*parts)
      admin_namespace + parts
    end
  end
end
