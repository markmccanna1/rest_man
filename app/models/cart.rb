class Cart < ActiveRecord::Base
  attr_accessible :customer_profile_id, :restaurant_profile_id, :status

  belongs_to :customer_profile
  belongs_to :restaurant_profile
  has_many :orders
  
  scope: :confirmed, lambda { |id| {:conditions => ["restaurant_profile_id =? AND status ='confirmed'", id]} }
  # Cart.find(:all, :conditions => ["restaurant_profile_id =? AND status ='confirmed'", id])
end
