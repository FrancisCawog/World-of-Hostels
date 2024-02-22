# == Schema Information
#
# Table name: reservations
#
#  id         :bigint           not null, primary key
#  listing_id :bigint           not null
#  user_id    :bigint           not null
#  room_id    :bigint           not null
#  num_guests :integer          not null
#  start_date :date             not null
#  end_date   :date             not null
#  refundable :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Reservation < ApplicationRecord
    validates :listing_id, :user_id, :room_id, :num_guests, :start_date, :end_date, presence: true
    validates :refundable, inclusion: { in: [true, false] }

    belongs_to :user
    belongs_to :listing
    belongs_to :room

    has_one :review, dependent: :destroy

    def num_nights
        return end_date - start_date
    end

    def total_price
        if room.room_type == "private"
            return ( num_nights * room.price)
        else 
            return ( num_nights * room.price * num_guests)
        end
    end
end
