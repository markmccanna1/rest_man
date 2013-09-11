class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_customer_profile, :current_restaurant_profile

  def current_customer_profile
  	@customer_profile ||= CustomerProfile.find_by_id(session[:customer_profile_id])
  end

  def current_restaurant_profile
    @restaurant_profile ||= RestaurantProfile.find_by_id(session[:restaurant_profile_id])
  end

  def authorize_customer
  	redirect_to restaurant_dashboard_url unless CustomerProfile.find_by_id(session[:customer_profile_id])
  end

  def authorize_restaurant
  	redirect_to customer_find_restaurant_profiles_url unless RestaurantProfile.find_by_id(session[:restaurant_profile_id])
  end

  def confirm_logged_in
    unless session[:restaurant_profile_id] || session[:customer_profile_id]
      flash[:notice] = "Please Log In."
      redirect_to new_session_url
    end
  end
end
