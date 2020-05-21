require "fileutils"
require "tmpdir"

super_development_path = File.expand_path("../../..", __dir__)
if File.exist?(File.join(super_development_path, "super.gemspec"))
  super_lib_path = File.join(super_development_path, "lib")

  $LOAD_PATH.unshift(super_lib_path) if !$LOAD_PATH.include?(super_lib_path)
end

require "rails"
require "rails/generators/rails/app/app_generator"
require "rails/generators/rails/plugin/plugin_generator"
require "generators/super/install/install_generator"

module Rails
  module Generators
    class AppGenerator
      def valid_const?
        true
      end
    end

    class PluginGenerator
      def valid_const?
        true
      end
    end
  end
end

class SuperDummyGenerator < Rails::Generators::Base
  source_root(File.expand_path("templates", __dir__))

  class_option :destination, required: true

  def create_new_plugin
    if plugin_name.blank?
      warn "Not currently in a plugin directory"
      exit
    end

    opts = {
      force: true,
      skip_active_storage: true,
      skip_action_mailer: true,
      skip_action_mailbox: true,
      skip_action_text: true,
      skip_action_cable: true,
      skip_coffee: true,
      database: "sqlite3",
    }

    Dir.mktmpdir do |dir|
      plugin_path = File.join(dir, plugin_name)
      generated_dummy_path = File.join(plugin_path, "test/dummy")

      invoke(Rails::Generators::PluginGenerator, [plugin_path], opts)

      inside(generated_dummy_path) do
        remove_file(".ruby-version")
      end

      FileUtils.rm_rf(dummy_path)
      FileUtils.mv(generated_dummy_path, dummy_path)
    end
  end

  def delete_unnecessary_files
    inside(dummy_path) do
      remove_file("app/assets/javascripts/cable.js")
      remove_file("app/channels/")
      remove_file("public/apple-touch-icon-precomposed.png")
      remove_file("public/apple-touch-icon.png")
    end
  end

  private

  def dummy_path
    @dummy_path ||= File.expand_path(options[:destination], destination_root)
  end

  def plugin_name
    @plugin_name ||=
      begin
        filename = Dir.glob("*.gemspec").first

        if filename.present?
          File.basename(filename, ".gemspec")
        else
          ""
        end
      end
  end
end

SuperDummyGenerator.start
