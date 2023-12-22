json.user do
  json.extract! @user, :id, :first_name, :last_name, :email, :nationality, :date_of_birth, :age, :created_at, :updated_at
  # json.photoUrl @user.profile_pic.attached? ? @user.photo.url : nil
end

json.reservations do
  @user.reservations.each do |reservation|
    json.set! reservation.id do
      json.extract! reservation, :id, :start_date, :end_date, :num_guests, :total_price, :refundable, :num_nights, :user_id, :room_id, :listing_id
    end
  end
end