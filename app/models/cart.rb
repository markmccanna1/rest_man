class Cart < ActiveRecord::Base
  attr_accessible :customer_profile_id, :restaurant_profile_id, :status

  belongs_to :customer_profile
  belongs_to :restaurant_profile
  has_many :orders

  scope :confirmed, lambda { |id| {:conditions => ["restaurant_profile_id =? AND status ='confirmed'", id]} }
  scope :locate, lambda { |time, id| {:conditions => ["updated_at > ? AND restaurant_profile_id =? AND status ='confirmed'", time, id]}}

  def build_cart(cart, items)
  	items.each do |i|
      item_id = i.to_i
      menu_item = MenuItem.find(item_id)
      order = Order.new
      menu_item.orders << order
      cart.orders << order
      cart.save
    end
  end

  def total
    cost = []
    self.orders.each do |order|
        cost << order.menu_item.to_dollars
    end

    cost.inject{ |sum, p| sum + p}.round(2)
  end
end
