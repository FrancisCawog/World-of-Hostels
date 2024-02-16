json.reservation do 
    json.extract! @reservation, :id, :start_date, :end_date, :num_guests, :total_price, :refundable, :num_nights, :user_id, :room_id, :listing_id, :created_at
end

if @reservation.review.present?
  json.review do
    review = @reservation.review
    json.extract! review, :id, :user_id, :listing_id, :reservation_id, :security, :cleanliness, :location, :facilities, :staff, :value_for_money, :atmosphere, :total_score, :about_you, :age_group, :trip_type, :feedback
  end
end