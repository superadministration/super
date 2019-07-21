$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "super/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "super"
  spec.version     = Super::VERSION
  spec.authors     = ["Zach Ahn"]
  spec.email       = ["engineering@zachahn.com"]
  spec.summary     = "A simple, powerful, zero* dependency Rails admin framework"
  spec.license     = "Fair Source 5"

  spec.files = Dir["{app,config,db,lib}/**/*", "LICENSE.txt", "Rakefile", "README.md"]

  spec.add_dependency "rails", ">= 5.0"

  spec.add_development_dependency "capybara"
  spec.add_development_dependency "sqlite3", "~> 1.3.6"
  spec.add_development_dependency "pry"
end
