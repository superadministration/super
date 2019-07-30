module Super
  class Engine < ::Rails::Engine
    initializer "super.assets.precompile" do |app|
      if Super::Assets.sprockets_available?
        app.config.assets.precompile << "config/super_manifest.js"
      end
    end
  end
end
