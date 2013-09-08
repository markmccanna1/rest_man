class SeatsController < ApplicationController

  before_filter :authorize_restaurant, :except => [:check_in, :index]

  def check_in
    seat = Seat.find(params[:seat_id])
    seat.update_attributes(customer_profile_id: session[:customer_profile_id])
    restaurant = seat.table.floor_plan.restaurant_profile
    redirect_to seats_url
  end

end
