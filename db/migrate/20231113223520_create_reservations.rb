class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.references :listing, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.references :room, foreign_key: true, null: false
      t.integer :num_guests, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.boolean :refundable, null: false
      t.timestamps
    end
  end
end
