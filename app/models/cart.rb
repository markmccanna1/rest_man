class Cart < ActiveRecord::Base
  attr_accessible :customer_profile_id, :restaurant_profile_id

  belongs_to :customer_profile
  belongs_to :restaurant_profile
  has_many :orders
end
