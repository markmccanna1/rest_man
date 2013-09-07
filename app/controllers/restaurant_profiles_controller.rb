class RestaurantProfilesController < ApplicationController
  
  before_filter :authorize_restaurant, :except => [:new, :create, :show, :find, :search]

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
    @restaurant = RestaurantProfile.find(params[:id])
    @menu = @restaurant.menus.first
    @order = Order.new
  end
end
