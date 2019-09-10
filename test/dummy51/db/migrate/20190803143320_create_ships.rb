class CreateShips < ActiveRecord::Migration[5.0]
  def change
    create_table :ships do |t|
      t.string :name
      t.string :registry
      t.string :class_name

      t.timestamps
    end
  end
end
