# == Schema Information
#
# Table name: rooms
#
#  id             :bigint           not null, primary key
#  listing_id     :bigint           not null
#  type           :string           not null
#  description    :text
#  num_beds       :integer          not null
#  available_beds :integer          not null
#  price          :float            not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Room < ApplicationRecord
    validates :listing_id, :type, :num_beds, :available_beds, :price, presence: true
    validates :type, inclusion: { in: %w(private shared), message: "%{value} is not a valid type" }
    validates :num_beds, :available_beds, :price, numericality: { greater_than_or_equal_to: 0 }
  
    belongs_to :listing
  end
  