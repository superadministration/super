#!/usr/bin/env ruby

ENV.fetch("BUNDLE_GEMFILE")

require "open3"
require_relative "../dummy_path"

def run_or_fail(*command)
  print("==> ")
  puts(command.join(" "))
  out, status = Open3.capture2e(*command)

  puts(out)

  if status.success?
    out.strip
  else
    puts("It failed!")
    exit(1)
  end
end

if Dir.exist?(SUPER_DUMMY_PATH)
  require "fileutils"
  FileUtils.rm_rf(SUPER_DUMMY_PATH)
end

run_or_fail(
  "bundle",
  "exec",
  "ruby",
  "super_test_engine/lib/super_test_engine/generate_dummy.rb",
  "--destination", SUPER_DUMMY_PATH
)

run_or_fail(
  "bundle",
  "exec",
  "ruby",
  "super_test_engine/lib/super_test_engine/generate_copy_app.rb",
  "--destination", SUPER_DUMMY_PATH
)

if ENV.fetch("BUNDLE_GEMFILE").include?("webpacker")
  Dir.chdir(SUPER_DUMMY_PATH) do
    run_or_fail("bundle", "exec", "rails", "webpacker:install")
  end

  if ENV.fetch("BUNDLE_GEMFILE").include?("webpacker6")
    run_or_fail("bin/yarn", "add", "rails-erb-loader")
    run_or_fail("bin/yarn", "add", "css-loader", "mini-css-extract-plugin", "css-minimizer-webpack-plugin")
  else
    Dir.chdir(SUPER_DUMMY_PATH) do
      run_or_fail("bundle", "exec", "rails", "webpacker:install:erb")
    end
  end

  Dir.chdir(SUPER_DUMMY_PATH) do
    run_or_fail("bundle", "exec", "rails", "generate", "super:webpacker")
  end

  run_or_fail("bin/yarn", "install")
end

run_or_fail("bundle", "exec", "rails", "db:migrate")

exec("bundle", "exec", "rails", "test")
