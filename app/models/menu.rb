class Menu < ActiveRecord::Base
  validates_presence_of :title

  belongs_to :restaurant_profile
end