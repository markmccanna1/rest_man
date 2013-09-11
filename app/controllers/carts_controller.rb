class CartsController < ApplicationController
  def index
    id = current_restaurant_profile.id
    @confirmed_carts = Cart.find(:all, :conditions => ["restaurant_profile_id =? AND status ='confirmed'", id])
    @confirmed_carts.each do |cart|
      @seat = CustomerProfile.find(cart.customer_profile_id).seat
      @table = @seat.table
    end
  end

  def show
    @cart = Cart.find(params[:id])
    @restaurant = RestaurantProfile.find(@cart.restaurant_profile_id)
    @seat = CustomerProfile.find(@cart.customer_profile_id).seat
    @table = @seat.table
  end

  def edit
    @cart = Cart.find(params[:id])
  end

  def update
    @cart = Cart.find(params[:id])
    cart_array = @cart.orders.map { |i| i.menu_item_id }
    update_array = (params[:item_ids]).map { |i| i.to_i }
    destroy_array = cart_array - update_array
    destroy_array.each do |destroy_order|
      order = @cart.orders.find_by_menu_item_id(destroy_order)
      order.destroy
    end
    if current_restaurant_profile
      current_restaurant_profile.update_attributes(last_cart_processed_at: Time.now)
    end
    @cart.update_attributes(status: "confirmed")
    @cart.orders.each do |order|
      order.update_attributes(status:"confirmed")
    end
    redirect_to cart_url(@cart)
  end

  def close
    @cart = Cart.find(params[:id])
    @cart.update_attributes(status: "completed")
    redirect_to carts_path
  end
end
