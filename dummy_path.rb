SUPER_DUMMY_PATH =
  case ENV["BUNDLE_GEMFILE"]
  when /rails50_sprockets3/ then "test/dummy50_sprockets3"
  when /rails51_sprockets3/ then "test/dummy51_sprockets3"
  when /rails52_sprockets4/ then "test/dummy52_sprockets4"
  else
    "test/dummy52_sprockets4"
  end
