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
    # when you save you destroy everything in it to make sure there are no duplicates
    # if you save a table and it has less tables than it had before, there will be a hanger-on
    floor_plan = params[:floorplan]
    @floorplan = FloorPlan.create(restaurant_profile_id: current_restaurant_profile.id)
    floor_plan.each do |key, value|
      table = @floorplan.tables.find_or_create_by_html_id(position_x: value[:positionX], position_y: value[:positionY], height: value[:height], width: value[:width], html_id: key)
        value["chairs"].each do |key, value|
          table.seats.find_or_create_by_html_id(position_x: value[:positionX], position_y: value[:positionY], height: value[:height], width: value[:width], html_id: key)
        end
      end
    render :json => {hello: 'helloooooo'}
  end


  def get_floor_plan
    @foor_plan = FloorPlan.find(8)
    @tables = @foor_plan.tables
    response_hash = {}
    @tables.each do |table|
      p table
      response_hash[table.html_id] = {positionX: table.position_x, positionY: table.position_y, height: table.height, width: table.width, seats: {}}
      table.seats.each do |seat|
        response_hash[table.html_id][:seats][seat.html_id] = {positionX: seat.position_x, positionY: seat.position_y, height: seat.height, width: seat.width}
      end
    end
    render :json => {floorPlan: response_hash}
  end
end
