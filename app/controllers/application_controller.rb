class ApplicationController < ActionController::Base
  protect_from_forgery

  def authorize_customer
  	unless CustomerProfile.find(session[:customer_profile_id])
    redirect_to new_session_url
    end
  end

  def authorize_restaurant
  	unless RestaurantProfile.find(session[:restaurant_profile_id])
    redirect_to new_session_url
    end
  end
end