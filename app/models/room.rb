# == Schema Information
#
# Table name: rooms
#
#  id          :bigint           not null, primary key
#  listing_id  :bigint           not null
#  room_type   :string           not null
#  room_title  :string           not null
#  description :text
#  num_beds    :integer          not null
#  price       :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Room < ApplicationRecord
    validates :listing_id, :room_type, :room_title, :num_beds, :price, presence: true
    validates :room_type, inclusion: { in: %w(private shared), message: "%{value} is not a valid type" }
    validates :num_beds, :price, numericality: { greater_than_or_equal_to: 0 }
  
    belongs_to :listing
    has_many :reservations

    def available_beds(start_date, end_date)
      taken_beds = self.reservations.where('(start_date >= ? AND start_date <= ?) OR (end_date >= ? AND end_date <= ?) OR (start_date <= ? AND end_date >= ?)', start_date, end_date, start_date, end_date, start_date, end_date).sum(:num_guests)
      return num_beds - taken_beds
    end
    
  end
  
