class RestaurantProfilesController < ApplicationController

  before_filter :authorize_restaurant, :except => [:show, :find, :search]

  def new
    @restaurant = RestaurantProfile.new
    @restaurant.build_user
  end

  def create
    @restaurant = RestaurantProfile.new(params[:restaurant_profile])
    @user = User.create(params[:user]) # same issue i identified in customer_profiles_controller
    if @restaurant.save
      session[:restaurant_profile_id] = @restaurant.id
      redirect_to customer_find_restaurant_profiles_url
    else
      redirect_to restaurant_profiles_new_url # redisplay form with errors?
    end
  end

  def show
    @restaurant = RestaurantProfile.find(params[:id])
    @menu = @restaurant.menus.first
    @order = Order.new
  end

  def find
    @restaurants = RestaurantProfile.all
  end

  def search
    restaurant = RestaurantProfile.find_by_restaurant_name(params[:name])
    redirect_to restaurant_profile_url(restaurant)
  end
end
