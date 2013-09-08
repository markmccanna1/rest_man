class Menu < ActiveRecord::Base
  attr_accessible :title, :restaurant_profile_id
  validates_presence_of :title

  belongs_to :restaurant_profile
  has_many :categories
end

