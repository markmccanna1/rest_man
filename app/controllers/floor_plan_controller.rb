class FloorPlanController < ApplicationController

   def index
     @restaurant = RestaurantProfile.find(session[:restaurant_profile_id])
     seats = @restaurant.floor_plan.tables.first.seats
     taken_seats = []
     seats.each do |seat|
      if seat.customer_profile_id != nil
        taken_seats << seat
      end
     end
    respond_to do |format|
     # render json: {color: "red", seats: taken_seats}
     format.html
     msg = {seats: taken_seats}
     format.json {render :json => msg}
    end
   end

  def check_out
    seat = Seat.find(params[:seat_id])
    seat.update_attributes(customer_profile_id: nil)
    puts seat.customer_profile_id
    redirect_to seats_url
  end


end
