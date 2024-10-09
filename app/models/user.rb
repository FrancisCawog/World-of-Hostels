# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  nationality     :string
#  date_of_birth   :date             not null
#  age             :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password
    before_validation :ensure_session_token

    validates :first_name, :last_name, presence: true
    validates :password, presence: true, length: { minimum: 8 }, allow_nil: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

    has_one_attached :photo, dependent: :destroy
    has_many :reservations, dependent: :destroy
    has_many :reviews, dependent: :destroy

    def age
      today = Date.today
      age = today.year - date_of_birth.year
      age -= 1 if today < date_of_birth + age.years
      return age
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user&.authenticate(password)
          return user
        else 
          nil
        end
      end
    
      def generate_unique_session_token
        loop do 
          token = SecureRandom.urlsafe_base64
          return token if !User.exists?(session_token: token)
        end
      end
    
      def ensure_session_token
        self.session_token ||= generate_unique_session_token
      end
      
      def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
      end
end
