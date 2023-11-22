json.reservation do 
    json.extract! @reservation, :id, :start_date, :end_date, :num_guests, :total_price, :refundable, :num_nights, :user_id, :room_id, :listing_id
end