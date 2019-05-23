module Super
  class Engine < ::Rails::Engine
    # Use development (library development, not RAILS_ENV=development) assets
    # if they exist.
    #
    # Real applications do NOT need this configuration set. Releases will
    # include assets in the appropriate folders.
    initializer "super.assets.path" do |app|
      current_directory = Pathname.new(__dir__).expand_path
      development_build_directory = current_directory.join("../../tmp/frontend_dev_dist/frontend")

      if development_build_directory.exist?
        config.assets.paths << development_build_directory
      end
    end

    initializer "super.assets.precompile" do |app|
      if [:sprockets3, :sprockets4].include?(Super.environment.assets_via)
        app.config.assets.precompile << "config/super_manifest.js"
      end
    end
  end
end
