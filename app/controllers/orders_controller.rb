class OrdersController < ApplicationController
  def new
    @order = Order.new
  end

  def create
    puts "This is the restaurant id"
    restaurant = params[:profile_id]
    user = User.find(params[:customer_profile_id])
    cart = Cart.new(customer_profile_id: session[:customer_profile_id], restaurant_profile_id: params[:profile_id])
    params[:item_ids].each do |i|
      item_id = i.to_i
      menu_item = MenuItem.find(item_id)
      order = Order.create
      menu_item.orders << order
      cart.orders << order
    end
    cart.save
    redirect_to edit_cart_url(cart)
  end
end
