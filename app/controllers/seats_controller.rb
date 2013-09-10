class SeatsController < ApplicationController

  before_filter :authorize_restaurant, :except => [:check_in, :index]

  def check_in
    puts params
    floor_plan = FloorPlan.find(params[:url_id])
    p floor_plan
    seat = floor_plan.seats.find_by_html_id(params[:seat_id])
    seat.update_attributes(customer_profile_id: session[:customer_profile_id])
    p session[:customer_profile_id]
    restaurant = seat.table.floor_plan.restaurant_profile
    respond_to do |format|
      format.html { redirect_to restaurant_profile_url(restaurant) }
      format.js
    end
  end

end
