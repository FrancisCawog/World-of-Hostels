json.user do
  json.extract! @user, :id, :first_name, :last_name, :email, :phone, :nationality, :date_of_birth, :age, :created_at, :updated_at
end