class Order < ActiveRecord::Base
  attr_accessible :menu_item_id, :cart_id

  belongs_to :menu_item
  belongs_to :cart

  # validates_presence_of :menu_item_id, :cart_id
end
