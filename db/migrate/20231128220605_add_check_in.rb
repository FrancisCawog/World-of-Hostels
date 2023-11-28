class AddCheckIn < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :check_in, :string, null: false
    add_column :listings, :check_out, :string, null: false
  end
end