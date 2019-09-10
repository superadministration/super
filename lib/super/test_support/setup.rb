#!/usr/bin/env ruby

require "fileutils"
require "pathname"

def help!
  puts "usage: #{$0} path/to/dest/app"
  exit
end

def assert(message)
  if !yield
    puts message
    exit(1)
  end
end

def act(message, if_not:)
  if !if_not.call
    yield
    puts message
  end
end

if ARGV.size != 1
  help!
end

dest = ARGV.first
dest = File.expand_path(dest, Dir.pwd)
dest = Pathname.new(dest)

src = File.expand_path("templates", __dir__)
src = Pathname.new(src)

assert("Path doesn't exist: #{dest.join("app")}") do
  dest.join("app").exist?
end

assert("Path doesn't exist: #{dest.join("app/models")}") do
  dest.join("app/models").exist?
end

FileUtils.cp(src.join("member.rb"), dest.join("app/models/member.rb"))
FileUtils.cp(src.join("ship.rb"), dest.join("app/models/ship.rb"))

assert("Path doesn't exist: #{dest.join("app/controllers")}") do
  dest.join("app/controllers").exist?
end

FileUtils.cp(src.join("admin_controller.rb"), dest.join("app/controllers/admin_controller.rb"))

act "Created #{dest.join("app/controllers/admin")}", if_not: -> { dest.join("app/controllers/admin").exist? } do
  FileUtils.mkdir(dest.join("app/controllers/admin"))
end

FileUtils.cp(src.join("admin/members_controller.rb"), dest.join("app/controllers/admin/members_controller.rb"))
FileUtils.cp(src.join("admin/ships_controller.rb"), dest.join("app/controllers/admin/ships_controller.rb"))

act "Created #{dest.join("app/super")}", if_not: -> { dest.join("app/super").exist? } do
  FileUtils.mkdir(dest.join("app/super"))
end

FileUtils.cp(src.join("member_dashboard.rb"), dest.join("app/super/member_dashboard.rb"))
FileUtils.cp(src.join("ship_dashboard.rb"), dest.join("app/super/ship_dashboard.rb"))

act "Created #{dest.join("db/migrate")}", if_not: -> { dest.join("db/migrate").exist? } do
  FileUtils.mkdir(dest.join("db/migrate"))
end

FileUtils.cp(src.join("20190216224956_create_members.rb"), dest.join("db/migrate/20190216224956_create_members.rb"))
FileUtils.cp(src.join("20190803143320_create_ships.rb"), dest.join("db/migrate/20190803143320_create_ships.rb"))
FileUtils.cp(src.join("20190806014121_add_ship_to_members.rb"), dest.join("db/migrate/20190806014121_add_ship_to_members.rb"))

FileUtils.cp(src.join("seeds.rb"), dest.join("db/seeds.rb"))

puts "Done!"
