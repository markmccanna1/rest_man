class MenuItem < ActiveRecord::Base
  attr_accessible :name, :description, :price, :category_id

  has_many :orders
  belongs_to :category

  validates_presence_of :name, :description, :price, :category_id
  validates_uniqueness_of :name 
end
