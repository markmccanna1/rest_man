class RestaurantProfilesController < ApplicationController

  before_filter :confirm_logged_in
  before_filter :authorize_restaurant, :except => [:new, :create, :show, :find, :search]

  def index
    @restaurant = RestaurantProfile.find(session[:restaurant_profile_id])
  end

  def new
    @restaurant = RestaurantProfile.new
    @restaurant.build_user
  end

  def create
    @restaurant = RestaurantProfile.new(params[:restaurant_profile])
    @user = User.new(params[:user])
    if @restaurant.save
      session[:restaurant_profile_id] = @restaurant.id
      redirect_to customer_find_restaurant_profiles_url
    else
      render :new
    end
  end

  def show
    if session[:cart_id]
      @cart = Cart.find(session[:cart_id])
    end
    @restaurant = RestaurantProfile.find(params[:id])
    @menu = @restaurant.menus.first
    @order = Order.new
  end

  def dashboard
    @restaurant = RestaurantProfile.find(session[:restaurant_profile_id])
    render :dashboard
  end

  def carts
    time = current_restaurant_profile.last_cart_processed_at
    id = current_restaurant_profile.id
    @carts = locate(time, id)
    render :json => {carts: @carts}
  end
end
