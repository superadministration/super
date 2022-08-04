# frozen_string_literal: true

module Super
  # Configures the host Rails app to work with Super
  class Railtie < ::Rails::Engine
    isolate_namespace Super

    initializer "super.assets.precompile" do |app|
      if Super::Assets::Handler.sprockets_available?
        app.config.assets.precompile << "config/super_manifest.js"
      end
    end

    initializer "super.inclusion" do
      ActiveSupport.on_load(:action_view) do
        include Super::FormBuilderHelper
        include Super::RenderHelper
      end
    end

    config.to_prepare do
      Super::Plugin::Registry.controller.ordered do |klass, method_name|
        Super::ApplicationController.public_send(method_name, klass)
      end

      Super::PackagedAsset.warning_message =
        if !Super::PackagedAsset.version_matches_gem?(Rails.root.join("package.json"))
          I18n.t("super.mismatching_package_json_gemfile_versions")
        end
    end
  end
end
