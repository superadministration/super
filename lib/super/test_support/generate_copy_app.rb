#!/usr/bin/env ruby

require "rails/generators"

class SuperCopyAppGenerator < Rails::Generators::Base
  source_root(File.expand_path("copy_app_templates", __dir__))

  class_option :destination, required: true

  def set_destination_root
    self.destination_root = options[:destination]
  end

  def ensure_reasonable_directory
    app_path = File.join(destination_root, "app")
    if !File.directory?(app_path)
      raise "Can't find dir: #{app_path}"
    end
  end

  def install_super
    Rails::Generators.invoke("super:install", [], destination_root: destination_root)
  end

  def copy_app
    copy_file "member.rb", "app/models/member.rb"
    copy_file "ship.rb", "app/models/ship.rb"

    copy_file "ships_controller.rb", "app/controllers/admin/ships_controller.rb"
    copy_file "members_controller.rb", "app/controllers/admin/members_controller.rb"
  end

  def copy_db
    migrations = [
      "20190216224956_create_members.rb",
      "20190803143320_create_ships.rb",
      "20190806014121_add_ship_to_members.rb",
    ]

    migrations.each do |migration|
      copy_file migration, "db/migrate/#{migration}"
    end

    copy_file "seeds.rb", "db/seeds.rb"
  end

  def copy_config
    copy_file "routes.rb", "config/routes.rb"
  end
end

SuperCopyAppGenerator.start
