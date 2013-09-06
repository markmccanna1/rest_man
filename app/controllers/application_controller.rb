class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_customer_profile, :current_restaurant_profile

  def current_customer_profile
  	@customer_profile ||= CustomerProfile.find_by_id(session[:customer_profile_id]) if session[:customer_profile_id]
  end

  def current_restaurant_profile
    @restaurant_profile ||= CustomerProfile.find_by_id(session[:restaurant_profile_id]) if session[:restaurant_profile_id]
  end

  def authorize_customer
  	unless CustomerProfile.find_by_id(session[:customer_profile_id])
    redirect_to new_session_url
    end
  end

  def authorize_restaurant
  	unless RestaurantProfile.find_by_id(session[:restaurant_profile_id])
    redirect_to new_session_url
    end
  end
end