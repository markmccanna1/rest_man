class Example < ActiveRecord::Base
  belongs_to :restaurant_profile
  attr_accessible :text, :restaurant_profile_id
end
