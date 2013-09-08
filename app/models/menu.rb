class Menu < ActiveRecord::Base
  attr_accessible :title, :restaurant_profile_id
  validates_presence_of :title

  belongs_to :restaurant_profile
  has_many :categories

  def self.import(file)
  	CSV.foreach(file.path, headers: true) do |row|
  	  MenuItem.create! row.to_hash
  	end
  end
end

