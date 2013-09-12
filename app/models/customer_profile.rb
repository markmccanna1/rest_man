class CustomerProfile < ActiveRecord::Base
  attr_accessible :zip_code, :user_attributes

  has_one :user, as: :profileable, dependent: :destroy
  has_one :seat

  accepts_nested_attributes_for :user
end
