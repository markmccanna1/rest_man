class RestaurantProfile < ActiveRecord::Base
  attr_accessible :restaurant_url, :restaurant_name, :street_address, :street_address_2, :account_holder_first_name,
                  :account_holder_last_name, :city, :state, :zip_code, :user_attributes,
                  :last_cart_processed_at

  has_one :user, as: :profileable, dependent: :destroy
  has_many :menus, dependent: :destroy
  has_one :floor_plan, dependent: :destroy
  has_many :carts, dependent: :destroy

  validates_presence_of :restaurant_name, :street_address, :account_holder_first_name, :account_holder_last_name, :city, :state, :zip_code

  accepts_nested_attributes_for :user
end

