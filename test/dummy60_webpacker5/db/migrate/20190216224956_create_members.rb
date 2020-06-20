class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.string :name, null: false
      t.string :rank, null: false
      t.string :position

      t.timestamps
    end
  end
end
