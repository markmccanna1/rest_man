class FloorPlan < ActiveRecord::Base
  attr_accessible :restaurant_profile_id

  validates_uniqueness_of :restaurant_profile_id

  has_many :tables, dependent: :destroy
  has_many :seats
  belongs_to :restaurant_profile
end
