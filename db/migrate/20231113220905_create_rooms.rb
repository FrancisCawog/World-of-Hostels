class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.references :listing, foreign_key: true, null: false
      t.string :room_type, null: false
      t.string :room_title, null: false
      t.text :description
      t.integer :num_beds, null: false
      t.float :price, null: false
      t.timestamps
    end
  end
end
