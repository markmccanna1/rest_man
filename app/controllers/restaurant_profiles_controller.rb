class RestaurantProfilesController < ApplicationController
  def new
  end

  def create
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
