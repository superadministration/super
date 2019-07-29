#!/usr/bin/env ruby

$valid_rails_versions = %w[rails50 rails51 rails52]
$valid_asset_managers = %w[sprockets3 sprockets4 webpacker]

def help!
  puts \
    "usage: #{$0} " \
    "(#{$valid_rails_versions.join("|")}) " \
    "(#{$valid_asset_managers.join("|")})"

  exit
end

def assert_file_exist(path)
  return if File.exist?(path)

  puts "file does not exist: #{path}"
  exit
end

help! if ARGV.size != 2
help! if !$valid_rails_versions.include?(ARGV[0])
help! if !$valid_asset_managers.include?(ARGV[1])

gemfile_basename = "#{ARGV[0]}_#{ARGV[1]}"
gemfile_path = File.expand_path("../gemfiles/#{gemfile_basename}.gemfile", __dir__)
gemfile_lock_path = File.expand_path("../gemfiles/#{gemfile_basename}.gemfile.lock", __dir__)

assert_file_exist(gemfile_path)
assert_file_exist(gemfile_lock_path)

File.write(File.expand_path("../Gemfile", __dir__), File.read(gemfile_path).sub(/\bgemspec\b.+$/, "gemspec"))
File.write(File.expand_path("../Gemfile.lock", __dir__), File.read(gemfile_lock_path).sub(/\bremote: \.\./, "remote: ."))

puts "ok"
