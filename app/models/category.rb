class Category < ActiveRecord::Base
  attr_accessible :title, :menu_items_attributes

  validates_presence_of :title

  belongs_to :menu
  has_many :menu_items, dependent: :destroy

  accepts_nested_attributes_for :menu_items
  
  def self.import(file, menu)
  	CSV.foreach(file.path, headers: true) do |row|
      hash = row.to_hash
      @category = menu.categories.find_or_create_by_title(title: hash["category"]) 
      @category.menu_items.find_or_create_by_name(name: hash["name"], description: hash["description"], price: hash["price"])
  	end
    return "success"
  end
end