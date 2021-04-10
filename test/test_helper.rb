# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require "pry"
require "simplecov"

require_relative "../dummy_path"
SimpleCov.start("rails")
require_relative "../#{SUPER_DUMMY_PATH}/config/environment"
ActiveRecord::Migrator.migrations_paths = [File.expand_path("../#{SUPER_DUMMY_PATH}/db/migrate", __dir__)]
require "rails/test_help"
require "capybara/rails"
require "capybara/dsl"
require "capybara/minitest"
require "mocha/minitest"
require_relative "support/ad_hoc_view_helpers"
require_relative "support/custom_database_schema"

# Filter out Minitest backtrace while allowing backtrace from other libraries
# to be shown.
Minitest.backtrace_filter = Minitest::BacktraceFilter.new

# Load fixtures from the engine
if ActiveSupport::TestCase.respond_to?(:fixture_path=)
  ActiveSupport::TestCase.fixture_path = File.expand_path("../super_test_engine/lib/super_test_engine/fixtures", __dir__)
  ActionDispatch::IntegrationTest.fixture_path = ActiveSupport::TestCase.fixture_path
  ActiveSupport::TestCase.file_fixture_path = ActiveSupport::TestCase.fixture_path + "/files"
  ActiveSupport::TestCase.fixtures :all
end

Capybara.server = :puma

class CapybaraTest < ActionDispatch::IntegrationTest
  include Capybara::DSL
  include Capybara::Minitest::Assertions

  teardown do
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end

  def self.selenium!(kind = :headless)
    setup do
      if Rails::VERSION::MAJOR == 5 && Rails::VERSION::MINOR == 0
        skip
      else
        if kind == :headless
          if ENV["SELENIUM_CHROME"]
            Capybara.current_driver = :selenium_chrome_headless
          else
            Capybara.current_driver = :selenium_headless
          end
        else
          if ENV["SELENIUM_CHROME"]
            Capybara.current_driver = :selenium_chrome
          else
            Capybara.current_driver = :selenium
          end
        end
      end
    end
  end

  def browser_tz(tz)
    original_time_zone = Time.zone
    original_env_tz = ENV["TZ"]
    ENV["TZ"] = tz
    Capybara.using_session(tz) do
      yield
    end
  ensure
    ENV["TZ"] = original_env_tz
    Time.zone = original_time_zone
  end
end

ActionView::TestCase.class_eval do
  include AdHocViewHelpers

  setup do
    view.lookup_context.prefixes << "super/application"
  end

  private

  # The behavior of this method (since 2009!) has been to prefer `@rendered`
  # over `@output_buffer`. I think this is usually fine, but it breaks when a
  # view helper calls render--this causes the render to be a subset of the
  # expected output.
  def document_root_element
    Nokogiri::HTML::Document.parse(@output_buffer.presence || @rendered).root
  end
end
