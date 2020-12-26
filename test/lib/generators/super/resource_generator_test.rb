require "test_helper"
require "generators/super/resource/resource_generator"

class Super::ResourceGeneratorTest < Rails::Generators::TestCase
  tests Super::ResourceGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination

  def test_generator_creates_expected_files
    @original_configuration = Super.configuration
    Super.instance_variable_set(:@configuration, nil)
    Super.configuration do |c|
      c.controller_namespace = "badminton"
    end

    run_generator(["ship"])

    assert_file("app/controllers/badminton/ships_controller.rb", <<~RUBY)
      module Badminton
        class ShipsController < BadmintonController
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
      end
    RUBY
  ensure
    Super.instance_variable_set(:@configuration, @original_configuration)
  end

  def test_generator_creates_expected_files_when_blank_namespace
    @original_configuration = Super.configuration
    Super.instance_variable_set(:@configuration, nil)
    Super.configuration do |c|
      c.controller_namespace = ""
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
  ensure
    Super.instance_variable_set(:@configuration, @original_configuration)
  end
end
