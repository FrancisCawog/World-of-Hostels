# == Schema Information
#
# Table name: reviews
#
#  id              :bigint           not null, primary key
#  listing_id      :bigint           not null
#  user_id         :bigint           not null
#  reservation_id  :bigint           not null
#  security        :integer          not null
#  cleanliness     :integer          not null
#  location        :integer          not null
#  facilities      :integer          not null
#  staff           :integer          not null
#  value_for_money :integer          not null
#  atmosphere      :integer          not null
#  feedback        :text
#  about_you       :string           not null
#  age_group       :string           not null
#  trip_type       :string           not null
#  total_score     :float            not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Review < ApplicationRecord
    validates :listing_id, :user_id, :reservation_id, :security, :cleanliness, :location, :facilities, :staff, :value_for_money, :atmosphere, :total_score, :about_you, :age_group, :trip_type, presence: true
    validates :security, :cleanliness, :location, :facilities, :staff, :value_for_money, :atmosphere, :total_score, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 10}

    belongs_to :listing
    belongs_to :user
    belongs_to :reservation

end
