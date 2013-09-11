class OrdersController < ApplicationController
  
  before_filter :confirm_logged_in
  
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
    cart.build_cart(cart, params[:item_ids])
    session[:cart_id] = cart.id
    redirect_to edit_cart_url(cart)
  end
end
