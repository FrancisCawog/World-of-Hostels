# == Schema Information
#
# Table name: reviews
#
#  id              :bigint           not null, primary key
#  listing_id      :bigint           not null
#  user_id         :bigint           not null
#  reservation_id  :bigint           not null
#  security        :integer          not null
#  cleanliness     :integer          not null
#  location        :integer          not null
#  facilities      :integer          not null
#  staff           :integer          not null
#  value_for_money :integer          not null
#  atmosphere      :integer          not null
#  feedback        :text
#  about_you       :string           not null
#  age_group       :string           not null
#  trip_type       :string           not null
#  total_score     :float            not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Review < ApplicationRecord

end
