# SuperTestEngine

Not an engine. Not just for tests.


## Example usage

```
env BUNDLE_GEMFILE="gemfiles/rails50_sprockets3.gemfile" bundle exec ruby super_test_engine/lib/super_test_engine/generate_copy_app.rb --destination=test/dummy50_sprockets3
env BUNDLE_GEMFILE="gemfiles/rails51_sprockets3.gemfile" bundle exec ruby super_test_engine/lib/super_test_engine/generate_copy_app.rb --destination=test/dummy51_sprockets3
env BUNDLE_GEMFILE="gemfiles/rails52_sprockets4.gemfile" bundle exec ruby super_test_engine/lib/super_test_engine/generate_copy_app.rb --destination=test/dummy52_sprockets4
env BUNDLE_GEMFILE="gemfiles/rails60_sprockets4.gemfile" bundle exec ruby super_test_engine/lib/super_test_engine/generate_copy_app.rb --destination=test/dummy60_sprockets4
env BUNDLE_GEMFILE="gemfiles/rails60_webpacker4.gemfile" bundle exec ruby super_test_engine/lib/super_test_engine/generate_copy_app.rb --destination=test/dummy60_webpacker4
```
