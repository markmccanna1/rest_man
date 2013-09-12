class Table < ActiveRecord::Base
  attr_accessible :floor_plan_id, :position_x, :position_y, :height, :width, :html_id

  has_many :seats, dependent: :destroy
  belongs_to :floor_plan
end
