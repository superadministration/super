module Super
  class Engine < ::Rails::Engine
    initializer "super.assets.precompile" do |app|
      if [:sprockets3, :sprockets4].include?(Super.environment.assets_via)
        app.config.assets.precompile << "config/super_manifest.js"
      end
    end
  end
end
