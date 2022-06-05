# frozen_string_literal: true

$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "super/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name = "super"
  spec.version = Super::VERSION
  spec.authors = ["Zach Ahn"]
  spec.email = ["engineering@zachahn.com"]
  spec.summary = "A simple, powerful, zero dependency Rails admin framework"
  spec.license = "LGPL-3.0-only"
  spec.metadata = {
    "bug_tracker_uri" => "https://github.com/superadministration/super/issues",
    "changelog_uri" => "https://github.com/superadministration/super/blob/main/CHANGELOG.md",
    "documentation_uri" => "https://superadministration.github.io/",
    "homepage_uri" => "https://github.com/superadministration/super",
    "source_code_uri" => "https://github.com/superadministration/super",
  }

  spec.files = Dir[
    "{app,config,db,lib,docs}/**/*",
    "frontend/*/dist/**/*",
    "LICENSE",
    "README.md",
    ".yardopts",
  ]

  spec.files = spec.files.select { |path| File.file?(path) }
  spec.required_ruby_version = ">= 2.3.0"

  rails_versions = ">= 5.0"
  spec.add_dependency "railties", rails_versions

  spec.add_development_dependency "rails", rails_versions
  spec.add_development_dependency "capybara", "~> 3.18"
  spec.add_development_dependency "selenium-webdriver", "~> 3.142"
  spec.add_development_dependency "webdrivers", "~> 4.3"
  spec.add_development_dependency "puma", "~> 4.3", ">= 4.3.6"
  spec.add_development_dependency "sqlite3"
  spec.add_development_dependency "pry-rails"
  spec.add_development_dependency "mocha"
  spec.add_development_dependency "i18n-debug"
  spec.add_development_dependency "simplecov"
  spec.add_development_dependency "rails_anonymous_controller_testing"
  spec.add_development_dependency "minitest-bisect"
end
