require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module Tbapp
  class Application < Rails::Application
          # don't attempt to auto-require the moonshine manifests into the rails env
      # config.paths.app.manifests 'app/manifests', :eager_load => false
      path_rejector = lambda { |s| s.include?("app/manifests") }
      config.eager_load_paths = config.eager_load_paths.reject(&path_rejector)

      # Remove the path from being lazily loaded
      ActiveSupport::Dependencies.autoload_paths.reject!(&path_rejector)    

      path_rejector = lambda { |s| s.include?("app/manifests") }
      config.eager_load_paths = config.eager_load_paths.reject(&path_rejector)
      ActiveSupport::Dependencies.autoload_paths.reject!(&path_rejector)


    # don't generate RSpec tests for views and helpers
    config.generators do |g|
      g.test_framework :rspec
      g.view_specs false
      g.helper_specs false
    end

    config.to_prepare do
      Devise::SessionsController.layout "login/login" 
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    I18n.enforce_available_locales = false
  end
end
