json.listings do
  @listings.each do |listing|
    json.set! listing.id do
      json.extract! listing, :id, :property_name, :property_type, :address, :city, :country, :description, :facilities, :house_rules, :latitude, :longitude, :has_wifi?, :has_breakfast?
      json.photoUrls listing.photos.attached? ? listing.photos.map { |photo| photo.url } : []
    end
  end
end

json.rooms do
  @listings.each do |listing|
   listing.rooms.each do |room|
     json.set! room.id do
       json.extract! room, :listing_id, :id, :room_type, :room_title, :description, :num_beds, :price, :listing_id
       json.photoUrls room.photos.attached? ? room.photos.map { |photo| photo.url } : []
       json.available_beds room.available_beds(@start_date, @end_date)
      end
    end
  end 
end

json.reviews do 
  @listings.each do |listing|
    listing.reviews.each do |review|
      json.set! review.id do
        json.extract!  review, :id, :user_id, :listing_id, :reservation_id, :security, :cleanliness, :location, :facilities, :staff, :value_for_money, :atmosphere, :total_score, :about_you, :age_group, :trip_type, :feedback
      end
    end
  end
end