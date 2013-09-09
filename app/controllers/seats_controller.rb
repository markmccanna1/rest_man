class SeatsController < ApplicationController

  before_filter :authorize_customer

  def check_in
    seat = Seat.find(params[:seat_id])
    seat.update_attributes(customer_profile_id: session[:customer_profile_id])
    restaurant = seat.table.floor_plan.restaurant_profile
    puts restaurant.restaurant_name
    if session[:customer_profile_id]
      respond_to do |format|
        # format.html { render :controller => 'floor_plan', :action => "index"}
        format.js {render :js => "window.location.href = '#{restaurant_profile_url(restaurant)}'"}
      end
    end
    # render :html => restaurant_profile_url(restaurant)
  end

end
