class Table < ActiveRecord::Base
  attr_accessible :floor_plan_id

  has_many :seats
  belongs_to :floor_plan
end
