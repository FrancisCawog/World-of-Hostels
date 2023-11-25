json.listing do
  json.extract! @listing, :id, :property_name, :property_type, :address, :city, :country, :check_in, :check_out, :description, :facilities, :house_rules, :latitude, :longitude, :has_wifi?, :has_breakfast?
  # json.photoUrl @listing.photo.attached? ? @listing.photo.url : nil
end

json.rooms do
   @listing.rooms.each do |room|
    json.set! room.id do
      json.extract! room, :id, :room_type, :room_title, :description, :num_beds, :price
      json.available_beds room.available_beds(@start_date, @end_date)
      end
  end 
end

json.reservations do
  @listing.reservations.each do |reservation|
    json.set! reservation.id do
      json.extract! reservation, :id, :start_date, :end_date, :num_guests, :total_price, :refundable, :num_nights, :user_id, :room_id, :listing_id
    end
  end
end