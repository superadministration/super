$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "super/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "super"
  spec.version     = Super::VERSION
  spec.authors     = ["Zach Ahn"]
  spec.email       = ["engineering@zachahn.com"]
  spec.summary     = "A simple, powerful, zero dependency Rails admin framework"
  spec.license     = "LGPL-3.0-only"

  spec.files = Dir["{app,config,db,frontend,lib,docs}/**/*", "LICENSE", "Rakefile", "README.md", ".yardopts"] & `git ls-files -z`.split("\x0")

  spec.required_ruby_version = ">= 2.3.0"

  spec.add_dependency "rails", ">= 5.0"

  spec.add_development_dependency "capybara", "~> 3.18"
  spec.add_development_dependency "selenium-webdriver", "~> 3.142"
  spec.add_development_dependency "webdrivers", "~> 4.3"
  spec.add_development_dependency "puma", "~> 4.3", ">= 4.3.6"
  spec.add_development_dependency "sqlite3"
  spec.add_development_dependency "pry"
  spec.add_development_dependency "minitest-ci"
  spec.add_development_dependency "appraisal"
  spec.add_development_dependency "yard"
  spec.add_development_dependency "mocha"
end
