
class CartsController < ApplicationController
  def index
  end

  def show
    @cart = Cart.find(session[:cart_id])
    @restaurant = RestaurantProfile.find(@cart.restaurant_profile_id)
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

    @cart.update_attributes(status: "confirmed")
    @cart.orders.each do |order|
      order.update_attributes(status:"confirmed")
    end
    redirect_to restaurant_profile_url(@cart.restaurant_profile_id)
  end

  def close
    @cart = Cart.find(params[:id])
    @cart.update_attributes(status: "completed")
    current_restaurant_profile.update_attributes(last_cart_processed_at: Time.now)
    redirect_to carts_path
  end
end
