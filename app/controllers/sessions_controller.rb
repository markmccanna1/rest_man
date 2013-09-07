class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_email(params[:email])
    if @user && @user.authenticate(params[:password])
      # it'd be nice if you extracted the if/else logic below into a private method, see below
      if @user.profileable_type == "CustomerProfile"
        session[:customer_profile_id] = @user.profileable_id
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
    redirect_to new_session_url, :notice => "You've successfully logged out"
  end

  private

  def set_session_vars
    # code goes here
  end
end