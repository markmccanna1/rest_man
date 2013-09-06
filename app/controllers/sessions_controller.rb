class SessionsController < ApplicationController
  include UserHelper

  def new
  end

  def create
    p params
    @user = User.find_by_email(params[:email])
    if @user && @user.authenticate(params[:password])
      if @user.profileable_type == "CustomerProfile"
        session[:customer_profile_id] = @user.profileable_id
        puts session[:customer_profile_id]
      else
        @user.profileable_type == "RestaurantProfile"
        session[:restaurant_profile_id] = @user.profileable.id
      end
      redirect_to customer_find_restaurant_profiles_url
    else
      render 'new'
    end
  end

  def destroy
    session.clear
    redirect_to root_url :notice => "You've successfully logged out"
  end
end