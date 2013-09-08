class FloorPlanController < ApplicationController

# before_filter :authorize_restaurant, :except => [:index]

  def index
    @restaurant = RestaurantProfile.find(params[:restaurant_profile_id])
    seats = @restaurant.floor_plan.tables.first.seats
    taken_seats = []
    seats.each do |seat|
      if seat.customer_profile_id != nil
        taken_seats << seat
      end
    end
    respond_to do |format|
      format.html
      msg = {seats: taken_seats}
      format.json {render :json => msg}
    end
  end

  def check_out
    seat = Seat.find(params[:seat_id])
    @restaurant = RestaurantProfile.find(session[:restaurant_profile_id])
    seat.update_attributes(customer_profile_id: nil)
    redirect_to restaurant_profile_floor_plan_index_url(@restaurant)
  end

  def test
    puts 'hey there sexy lady'
  end
end
