# frozen_string_literal: true

SUPER_DEFAULT_RAILS = "rails70_sprockets4"
SUPER_RAILS_ROOTS = {
  "rails50_sprockets3_ruby23" => "test/dummy/rails50_sprockets3",
  "rails50_sprockets3" => "test/dummy/rails50_sprockets3",
  "rails51_sprockets3" => "test/dummy/rails51_sprockets3",
  "rails52_sprockets4" => "test/dummy/rails52_sprockets4",
  "rails60_sprockets4" => "test/dummy/rails60_sprockets4",
  "rails61_sprockets4" => "test/dummy/rails61_sprockets4",
  "rails70_sprockets4" => "test/dummy/rails70_sprockets4",
}

SUPER_DEVELOPMENT_GEMFILE =
  if ENV["BUNDLE_GEMFILE"] && ENV["BUNDLE_GEMFILE"] =~ /\.gemfile\z/
    File.basename(ENV["BUNDLE_GEMFILE"], ".gemfile")
  else
    SUPER_DEFAULT_RAILS
  end

SUPER_DUMMY_PATH = SUPER_RAILS_ROOTS.fetch(SUPER_DEVELOPMENT_GEMFILE)
