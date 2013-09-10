class OrdersController < ApplicationController
  def new
    @order = Order.new
  end

  def create
    restaurant = params[:profile_id]
    if session[:cart_id]
      cart = Cart.find(session[:cart_id])
    else
      cart = Cart.new(customer_profile_id: session[:customer_profile_id], restaurant_profile_id: params[:profile_id])
    end

    params[:item_ids].each do |i|
      item_id = i.to_i
      menu_item = MenuItem.find(item_id)
      order = Order.new
      menu_item.orders << order
      cart.orders << order
    end
    cart.save
    session[:cart_id] = cart.id
    redirect_to edit_cart_url(cart)
  end
end
