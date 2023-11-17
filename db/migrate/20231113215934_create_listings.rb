class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :property_name, null: false
      t.string :property_type, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :country, null: false
      t.string :check_in, null: false
      t.string :check_out, null: false
      t.text :description
      t.text :facilities
      t.text :house_rules
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.boolean :has_wifi?
      t.boolean :has_breakfast?
      t.timestamps
    end
    add_index :listings, :address, unique: true
  end
end
