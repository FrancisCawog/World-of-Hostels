json.listings do
  @listings.each do |listing|
    json.set! listing.id do
      json.extract! listing, :id, :property_name, :property_type, :address, :city, :country, :description, :facilities, :house_rules, :latitude, :longitude, :has_wifi?, :has_breakfast?
    end
  end
end