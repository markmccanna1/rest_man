class SeatsController < ApplicationController
  def index
    @seats = Seat.all
    puts session[:customer_profile_id]
  end

  def check_in
    seat = Seat.find(params[:seat_id])
    puts session[:customer_profile_id]
    # seat.customer_profile_id = session[:customer_profile_id]
    puts 'sesssssssssssssssssssion'
    redirect_to seats_url
  end
end
