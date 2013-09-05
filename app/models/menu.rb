class Menu < ActiveRecord::Base
  validates_presence_of :title

  belongs_to :manager_profile
end