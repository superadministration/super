require "test_helper"
require "generators/super/resource/resource_generator"

class Super::ResourceGeneratorTest < Rails::Generators::TestCase
  tests Super::ResourceGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination

  setup do
    @original_configuration = Super.configuration
    Super.instance_variable_set(:@configuration, nil)

    destination_root.join("config").mkdir
    destination_root.join("config", "routes.rb").write(<<~RUBY)
      Rails.application.routes.draw do
        # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
      end
    RUBY
  end

  teardown do
    Super.instance_variable_set(:@configuration, @original_configuration)
  end

  def test_generator_creates_expected_files
    Super.configuration do |c|
      c.generator_module = "badminton"
    end

    run_generator(["ship"])

    assert_file("app/controllers/badminton/ships_controller.rb", <<~RUBY)
      class Badminton::ShipsController < BadmintonController
        private

        def new_controls
          Controls.new
        end

        class Controls < Super::Controls
          def model
            Ship
          end
        end
      end
    RUBY
  end

  def test_generator_creates_expected_files_when_blank_namespace
    Super.configuration do |c|
      c.generator_module = ""
    end

    run_generator(["ship"])

    assert_file("app/controllers/ships_controller.rb", <<~RUBY)
      class ShipsController < AdminController
        private

        def new_controls
          Controls.new
        end

        class Controls < Super::Controls
          def model
            Ship
          end
        end
      end
    RUBY
  end

  def test_generator_creates_expected_file_with_nested_namespace
    Super.configuration do |c|
      c.generator_module = "admin/management"
    end

    run_generator(["ship"])

    assert_file("app/controllers/admin/management/ships_controller.rb", <<~RUBY)
      class Admin::Management::ShipsController < Admin::ManagementController
        private

        def new_controls
          Controls.new
        end

        class Controls < Super::Controls
          def model
            Ship
          end
        end
      end
    RUBY
  end

  def test_updates_routes_under_namespace
    Super.configuration do |c|
    end

    run_generator(["ship", "--force"])

    assert_file("config/routes.rb", <<~RUBY)
      Rails.application.routes.draw do
        namespace :admin do
          resources :ships
        end
        # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
      end
    RUBY

    run_generator(["member", "--force"])

    assert_file("config/routes.rb", <<~RUBY)
      Rails.application.routes.draw do
        namespace :admin do
          resources :members
          resources :ships
        end
        # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
      end
    RUBY
  end

  def test_updates_routes_under_scope
    Super.configuration do |c|
      c.path = "/my_path"
      c.generator_module = "my_module"
      c.generator_as = "my_as"
    end

    run_generator(["ship", "--force"])

    assert_file("config/routes.rb", <<~RUBY)
      Rails.application.routes.draw do
        scope path: "/my_path", module: "my_module", as: "my_as" do
          resources :ships
        end
        # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
      end
    RUBY

    run_generator(["member", "--force"])

    assert_file("config/routes.rb", <<~RUBY)
      Rails.application.routes.draw do
        scope path: "/my_path", module: "my_module", as: "my_as" do
          resources :members
          resources :ships
        end
        # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
      end
    RUBY
  end

  def test_updates_routes_under_top_level
    Super.configuration do |c|
      c.path = ""
      c.generator_module = ""
      c.generator_as = ""
    end

    run_generator(["ship", "--force"])

    assert_file("config/routes.rb", <<~RUBY)
      Rails.application.routes.draw do
        resources :ships
        # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
      end
    RUBY

    run_generator(["member", "--force"])

    assert_file("config/routes.rb", <<~RUBY)
      Rails.application.routes.draw do
        resources :members
        resources :ships
        # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
      end
    RUBY
  end
end
