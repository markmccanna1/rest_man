class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_customer_profile, :current_restaurant_profile

  def current_customer_profile
  	@customer_profile ||= CustomerProfile.find_by_id(session[:customer_profile_id]) if session[:customer_profile_id]
  end

  def current_restaurant_profile
    @restaurant_profile ||= CustomerProfile.find_by_id(session[:restaurant_profile_id]) # i dont think we need the if statement here, because i think find_by_id will return nil if a row isnt found
  end

  def authorize_customer
  	redirect_to new_session_url unless current_customer_profile
  end

  def authorize_restaurant
  	redirect_to new_session_url unless current_restaurant_profile
  end
end