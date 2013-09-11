class FloorPlan < ActiveRecord::Base
  attr_accessible :restaurant_profile_id

  has_many :tables
  has_many :seats
  belongs_to :restaurant_profile
end
