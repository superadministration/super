class CreateFavoriteThings < ActiveRecord::Migration[5.0]
  def change
    create_table :favorite_things do |t|
      t.references :member, null: false, foreign_key: true
      t.text :name

      t.timestamps
    end
  end
end
