# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

if caller.none? { |line| line =~ /appraisal/ }
  require_relative "./dummy_path"
  version_specific_gemfile = File.read(File.join(__dir__, "gemfiles", "#{SUPER_DEVELOPMENT_GEMFILE}.gemfile"))
  instance_eval(version_specific_gemfile.sub(/^gemspec.*$/, ""))
end

# Declare your gem's dependencies in super.gemspec.
# Bundler will treat runtime dependencies like base dependencies, and
# development dependencies will be added by default to the :development group.
gemspec

# Declare any dependencies that are still in development here instead of in
# your gemspec. These might include edge Rails or gems from your path or
# Git. Remember to move these dependencies to your gemspec before releasing
# your gem to rubygems.org.

# To use a debugger
# gem 'byebug', group: [:development, :test]

gem "appraisal", require: false
gem "yard", require: false
gem "rubocop", "~> 1.0", require: false

# Sorbet
gem "sorbet", require: false
gem "sorbet-runtime"
gem "tapioca", require: false
gem "spoom", require: false
gem "sord", require: false
