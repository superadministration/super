SUPER_DEFAULT_RAILS = "rails60_sprockets4"
SUPER_RAILS_ROOTS = {
  "rails50_sprockets3" => "test/dummy50_sprockets3",
  "rails51_sprockets3" => "test/dummy51_sprockets3",
  "rails52_sprockets4" => "test/dummy52_sprockets4",
  "rails60_sprockets4" => "test/dummy60_sprockets4",
  "rails60_webpacker4" => "test/dummy60_webpacker4",
  "rails60_webpacker5" => "test/dummy60_webpacker5",
}

query =
  if ENV["BUNDLE_GEMFILE"]
    File.basename(ENV["BUNDLE_GEMFILE"], ".gemfile")
  end

SUPER_DUMMY_PATH = SUPER_RAILS_ROOTS[query] || SUPER_RAILS_ROOTS.fetch(SUPER_DEFAULT_RAILS)
