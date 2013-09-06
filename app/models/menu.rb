class Menu < ActiveRecord::Base
  attr_accessible :title

  validates_presence_of :title

  belongs_to :restaurant_profile
  has_many :categories
end