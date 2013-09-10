class Seat < ActiveRecord::Base
  attr_accessible :customer_profile_id, :table_id, :position_x, :position_y, :height, :width, :html_id

  belongs_to :customer_profile
  belongs_to :table
end
