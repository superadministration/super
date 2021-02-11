require "test_helper"

module Super
  class DisplayGuessTest < ActiveSupport::TestCase
    setup do
      @new_connection = ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: ":memory:")
      @original_migration_verbosity = ActiveRecord::Migration.verbose
      ActiveRecord::Migration.verbose = false

      ActiveRecord::Schema.define(version: 1) do
        create_table :chthonics do |t|
          t.text :hades
          t.time :nyx
          t.datetime :charon
        end

        create_table :olympians do |t|
          t.datetime :updated_at
          t.references :chthonic, foreign_key: true
          t.text :zeus
          t.binary :poseidon
          t.boolean :athena
          t.date :aphrodite
          t.datetime :artemis
          t.datetime :created_at
          t.decimal :ares
          t.float :dionysus
          t.integer :hermes
          t.string :demeter
          t.string :name
        end
      end
    end

    teardown do
      ActiveRecord::Migration.verbose = @original_migration_verbosity
      ActiveRecord::Base.remove_connection(@new_connection)
      ActiveRecord::Base.establish_connection(:test)
    end

    class Chthonic < ActiveRecord::Base
      self.table_name = "chthonics"
    end

    class Olympian < ActiveRecord::Base
      self.table_name = "olympians"
      belongs_to :chthonic
    end

    def test_show
      display = Display.new do |fields, type|
        Display::Guesser.new(model: Olympian, action: action!(:show), fields: fields, type: type).call
      end
      display.apply(action: action!(:show))

      assert_equal(
        %w[id name zeus poseidon athena aphrodite artemis ares dionysus hermes demeter created_at updated_at],
        display.each_attribute_name.to_a
      )

      display = Display.new do |fields, type|
        Display::Guesser.new(model: Chthonic, action: action!(:show), fields: fields, type: type).call
      end
      display.apply(action: action!(:show))

      assert_equal(
        %w[id hades nyx charon],
        display.each_attribute_name.to_a
      )
    end

    def test_index
      display = Display.new do |fields, type|
        Display::Guesser.new(model: Olympian, action: action!(:index), fields: fields, type: type).call
      end
      display.apply(action: action!(:index))

      assert_equal(
        %w[id name zeus poseidon athena] + [:actions],
        display.each_attribute_name.to_a
      )

      display = Display.new do |fields, type|
        Display::Guesser.new(model: Chthonic, action: action!(:index), fields: fields, type: type).call
      end
      display.apply(action: action!(:index))

      assert_equal(
        %w[id hades nyx charon] + [:actions],
        display.each_attribute_name.to_a
      )
    end

    private

    def action!(action)
      ActionInquirer.new(ActionInquirer.default_for_resources, action)
    end
  end
end
