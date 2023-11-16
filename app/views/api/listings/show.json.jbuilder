json.listing do
  json.extract! @listing, :id, :property_name, :property_type, :address, :city, :country, :description, :facilities, :house_rules, :latitude, :longitude, :has_wifi?, :has_breakfast?
end

json.rooms do
   @listing.rooms.each do |room|
     json.set! room.id do
       json.extract! room, :id, :room_type, :room_title, :description, :num_beds, :price
       json.available_beds do
         room.available_beds(@start_date, @end_date)
        end
      end
  end 
end