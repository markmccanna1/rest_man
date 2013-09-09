class Seat < ActiveRecord::Base
  attr_accessible :customer_profile_id

  belongs_to :customer_profile
  belongs_to :table
end
