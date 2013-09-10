class SeatsController < ApplicationController

<<<<<<< HEAD
  before_filter :authorize_restaurant, :except => [:check_in, :index]
=======
  before_filter :authorize_customer
>>>>>>> master

  def check_in
    seat = Seat.find(params[:seat_id])
    seat.update_attributes(customer_profile_id: session[:customer_profile_id])
    restaurant = seat.table.floor_plan.restaurant_profile
<<<<<<< HEAD
    respond_to do |format|
      format.html { redirect_to restaurant_profile_url(restaurant) }
      format.js
    end
=======
    puts restaurant.restaurant_name
    if session[:customer_profile_id]
      respond_to do |format|
        # format.html { render :controller => 'floor_plan', :action => "index"}
        format.js {render :js => "window.location.href = '#{restaurant_profile_url(restaurant)}'"}
      end
    end
    # render :html => restaurant_profile_url(restaurant)
>>>>>>> master
  end

end
