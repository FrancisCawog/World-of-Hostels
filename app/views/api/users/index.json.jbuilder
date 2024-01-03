json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :first_name, :last_name, :nationality
    #   json.photoUrl @user.profile_pic.attached? ? @user.photo.url : nil
    end
  end
end