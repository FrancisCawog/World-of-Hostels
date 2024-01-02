json.review do
    json.extract! @review, :id, :user_id, :listing_id, :reservation_id, :security, :cleanliness, :location, :facilities, :staff, :value_for_money, :atmosphere, :total_score, :about_you, :age_group, :trip_type, :feedback
end