class Seat < ActiveRecord::Base
  attr_accessible :floor_plan_id, :customer_profile_id, :table_id, :position_x, :position_y, :height, :width, :html_id

  validates_uniqueness_of :customer_profile_id
  
  belongs_to :customer_profile
  belongs_to :restaurant_profile
  belongs_to :table
end
