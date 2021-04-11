module CustomDatabaseSchema
  extend ActiveSupport::Concern

  included do
    setup do
      @new_connection = ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: ":memory:")
      @original_migration_verbosity = ActiveRecord::Migration.verbose
      ActiveRecord::Migration.verbose = false

      custom_schema
    end

    teardown do
      ActiveRecord::Migration.verbose = @original_migration_verbosity
      ActiveRecord::Base.remove_connection(@new_connection)
      ActiveRecord::Base.establish_connection(:test)
    end
  end

  class_methods do
    def custom_schema(&block)
      define_method(:custom_schema) do
        block.call
      end
    end
  end
end
