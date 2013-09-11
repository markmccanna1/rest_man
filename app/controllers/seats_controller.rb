class SeatsController < ApplicationController

  before_filter :authorize_customer

  def check_in
    floor_plan = FloorPlan.find(params[:url_id])
    seat = floor_plan.seats.find_by_html_id(params[:seat_id])
    seat.update_attributes(customer_profile_id: session[:customer_profile_id])
    restaurant = seat.table.floor_plan.restaurant_profile
    render :js => "window.location.href = '#{restaurant_profile_url(restaurant)}'"
  end

end
