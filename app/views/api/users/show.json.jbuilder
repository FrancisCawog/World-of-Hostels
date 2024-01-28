json.user do
  json.extract! @user, :id, :first_name, :last_name, :email, :nationality, :date_of_birth, :age, :created_at, :updated_at
  # json.photoUrl @user.profile_pic.attached? ? @user.photo.url : nil
  json.photoUrl @user.photo.attached? ? @user.photo.url : nil
end

json.reservations do
  @user.reservations.each do |reservation|
    json.set! reservation.id do
      json.extract! reservation, :id, :start_date, :end_date, :num_guests, :total_price, :refundable, :num_nights, :user_id, :room_id, :listing_id
    end
  end
end

json.reviews do 
  @user.reviews.each do |review|
    json.set! review.id do
      json.extract!  review, :id, :user_id, :listing_id, :reservation_id, :security, :cleanliness, :location, :facilities, :staff, :value_for_money, :atmosphere, :total_score, :about_you, :age_group, :trip_type, :feedback
    end
  end
end