class ApplicationController < ActionController::Base
  protect_from_forgery

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