module Super
  # Configures the host Rails app to work with Super
  class Engine < ::Rails::Engine
    isolate_namespace Super

    initializer "super.assets.precompile" do |app|
      if Super::Assets::Handler.sprockets_available?
        app.config.assets.precompile << "config/super_manifest.js"
      end
    end

    config.to_prepare do
      Super::Plugin::Registry.controller.ordered do |klass, method_name|
        Super::ApplicationController.public_send(method_name, klass)
      end
    end
  end
end
