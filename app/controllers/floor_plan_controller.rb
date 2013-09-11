class FloorPlanController < ApplicationController

before_filter :authorize_restaurant, :except => [:get_floor_plan, :show]

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

  def new
    @floor_plan = FloorPlan.new
  end

  def check_out
    floor_plan = FloorPlan.find(params[:url_id])
    seat = floor_plan.seats.find_by_html_id(params[:seat_id])
    puts 'seat'
    puts params[:seat_id]
    puts seat.id
    @restaurant = RestaurantProfile.find(session[:restaurant_profile_id])
    puts 'restaurant'
    puts @restaurant.id
    seat.update_attributes(customer_profile_id: nil)
    puts 'customer_profile_id'
    puts seat.customer_profile_id
    render :js => "window.location.href = '#{floor_plan_url(@restaurant.floor_plan.id)}'"
  end

  def show
    if current_restaurant_profile
      @floor_plan = FloorPlan.find(current_restaurant_profile.floor_plan.id)
    else
      @floor_plan = FloorPlan.find(params[:id])
    end
    taken_seats = []
    @floor_plan.seats.each do |seat|
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

  def test
    # when you save you destroy everything in it to make sure there are no duplicates
    # if you save a table and it has less tables than it had before, there will be a hanger-on
    floor_plan = params[:floorplan]
    @floorplan = FloorPlan.create(restaurant_profile_id: current_restaurant_profile.id)
    @restaurant = @floorplan.restaurant_profile
    floor_plan.each do |key, value|
      table = @floorplan.tables.find_or_create_by_html_id(position_x: value[:positionX], position_y: value[:positionY], height: value[:height], width: value[:width], html_id: key)
        value["chairs"].each do |key, value|
          table.seats.find_or_create_by_html_id(position_x: value[:positionX], position_y: value[:positionY], height: value[:height], width: value[:width], html_id: key, floor_plan_id: @floorplan.id)
        end
      end
    render :js => "window.location.href = '#{floor_plan_url}'"
  end

  def get_floor_plan
    @floor_plan = FloorPlan.find(params[:id])
    # @floor_plan.restaurant_profile.id#current_restaurant_profile.floor_plan
    @tables = @floor_plan.tables
    response_hash = {}
    @tables.each do |table|
      response_hash[table.html_id] = {positionX: table.position_x, positionY: table.position_y, height: table.height, width: table.width, seats: {}}
      table.seats.each do |seat|
        response_hash[table.html_id][:seats][seat.html_id] = {positionX: seat.position_x, positionY: seat.position_y, height: seat.height, width: seat.width}
      end
    end
    render :json => {floorPlan: response_hash}
  end
end
