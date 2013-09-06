class RestaurantProfile < ActiveRecord::Base
  attr_accessible :restaurant_url, :restaurant_name, :street_address, :account_holder_first_name, :account_holder_last_name, :city, :state, :zip_code

  validates_presence_of :restaurant_name, :street_address, :account_holder_first_name, :account_holder_last_name, :city, :state, :zip_code
  validates_uniqueness_of :restaurant_name

  has_one :user, as: :profileable
  has_many :menus
end