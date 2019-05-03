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
      def configure(attr, default: nil)
        define_method(attr) do
          if configured?(attr)
            return instance_variable_get("@#{attr}")
          end

          if !default.nil?
            return default
          end

          raise Error::UnconfiguredConfiguration, "unconfigured: #{attr}"
        end

        attr_writer(attr)
      end
    end
  end

  class Configuration
    include ConfigurationLogic

    configure :title
    configure :index_resources_per_page, default: 20
  end
end
