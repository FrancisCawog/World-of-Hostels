# == Schema Information
#
# Table name: listings
#
#  id             :bigint           not null, primary key
#  property_name  :string           not null
#  property_type  :string           not null
#  address        :string           not null
#  city           :string           not null
#  country        :string           not null
#  check_in       :string           not null
#  check_out      :string           not null
#  description    :text
#  facilities     :text
#  house_rules    :text
#  latitude       :float            not null
#  longitude      :float            not null
#  has_wifi?      :boolean
#  has_breakfast? :boolean
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Listing < ApplicationRecord
    validates :property_name, :address, :city, :country, :latitude, :longitude, :check_in, :check_out, presence: true
    validates :property_type, inclusion: { in: %w(hostel bed_and_breakfast hotel), message: "%{value} is not a valid property type" }
    validates :address, uniqueness: true
    validates :has_wifi?, :has_breakfast?, inclusion: { in: [true, false] }
    validate :valid_coordinates

    has_many :rooms, dependent: :destroy
    has_many :reservations, dependent: :destroy
    has_many :reviews, dependent: :destroy
    has_many_attached :photos

    private

    def valid_coordinates
        errors.add(:latitude, 'must be between -90 and 90') unless latitude.between?(-90, 90)
        errors.add(:longitude, 'must be between -180 and 180') unless longitude.between?(-180, 180)
    end
end
