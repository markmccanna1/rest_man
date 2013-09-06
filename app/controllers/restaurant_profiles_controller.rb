class RestaurantProfilesController < ApplicationController
  
  include UserHelper

  def new
    @restaurant = RestaurantProfile.new
    @restaurant.build_user
  end

  def create
    @restaurant = RestaurantProfile.new(params[:restaurant_profile])
    @user = User.create(params[:user])
    if @restaurant.save
      session[:restaurant_id] = @restaurant.id
      redirect_to edit_menu_url
    else
      redirect_to new_restaurant_profile_url
    end
  end

  def show
    @restaurant = RestaurantProfile.find(params[:id])
  end

  def find
    @restaurants = RestaurantProfile.all
  end

  def search
    restaurant = RestaurantProfile.find_by_restaurant_name(params[:name])
    redirect_to restaurant_profile_url(restaurant) 
  end
end