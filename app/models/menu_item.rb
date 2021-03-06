class MenuItem < ActiveRecord::Base
  attr_accessible :name, :description, :price, :category_id

  has_many :orders
  belongs_to :category

  validates_presence_of :name, :description, :price

   def to_dollars
    num = (self.price / 100.00)
    sprintf('%.2f', num)
  end
end
