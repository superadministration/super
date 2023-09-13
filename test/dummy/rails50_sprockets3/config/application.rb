require_relative 'boot'

# Pick the frameworks you want:
require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"
# require "action_mailer/railtie"
require "active_job/railtie"
# require "action_cable/engine"
require "rails/test_unit/railtie"
require "sprockets/railtie"

Bundler.require(*Rails.groups)
require "super"

module Dummy
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end


Rails.application.config.paths.add "../share/app/controllers", eager_load: true
Rails.application.config.paths.add "../share/app/models", eager_load: true
Rails.application.config.paths["app/views"] << "../share/app/views"
