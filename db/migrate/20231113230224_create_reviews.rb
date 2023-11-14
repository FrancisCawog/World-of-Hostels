class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :listing, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.references :reservation, foreign_key: true, null: false
      t.integer :security, null: false
      t.integer :cleanliness, null: false
      t.integer :location, null: false
      t.integer :facilities, null: false
      t.integer :staff, null: false
      t.integer :value_for_money, null: false
      t.integer :atmosphere, null: false
      t.text :feedback
      t.string :about_you, null: false
      t.string :age_group, null: false
      t.string :trip_type, null: false
      t.float :total_score, null: false
      t.timestamps
    end
  end
end