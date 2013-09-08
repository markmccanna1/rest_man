class FloorPlan < ActiveRecord::Base
  attr_accessible :restaurant_profile_id

  has_many :tables
  belongs_to :restaurant_profile
end
