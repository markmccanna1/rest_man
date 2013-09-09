class RestaurantProfile < ActiveRecord::Base
  attr_accessible :restaurant_url, :restaurant_name, :street_address, :street_address_2, :account_holder_first_name,
                  :account_holder_last_name, :city, :state, :zip_code, :user_attributes,
                  :last_cart_processed_at

  has_one :user, as: :profileable
  has_many :menus
  has_many :examples
  has_one :floor_plan
  has_many :carts

  validates_presence_of :restaurant_name, :street_address, :account_holder_first_name, :account_holder_last_name, :city, :state, :zip_code

  accepts_nested_attributes_for :user
end

