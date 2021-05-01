# frozen_string_literal: true

class CreateSinks < ActiveRecord::Migration[5.0]
  def change
    create_table :sinks do |t|
      t.string :string_column
      t.text :text_column
      t.integer :integer_column
      t.bigint :bigint_column
      t.float :float_column
      t.decimal :decimal_column
      t.numeric :numeric_column
      t.datetime :datetime_column
      t.time :time_column
      t.date :date_column
      t.binary :binary_column
      t.boolean :boolean_column

      t.timestamps
    end
  end
end
