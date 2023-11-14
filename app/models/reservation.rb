# == Schema Information
#
# Table name: reservations
#
#  id          :bigint           not null, primary key
#  listing_id  :bigint           not null
#  user_id     :bigint           not null
#  num_guests  :integer          not null
#  num_nights  :integer          not null
#  start_date  :date             not null
#  end_date    :date             not null
#  total_price :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Reservation < ApplicationRecord

end
