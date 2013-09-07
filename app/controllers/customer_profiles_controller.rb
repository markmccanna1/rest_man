class CustomerProfilesController < ApplicationController

  before_filter :authorize_customer

  def new
    @customer = CustomerProfile.new
    @customer.build_user
  end

  def create
    @customer = CustomerProfile.new(params[:customer_profile])
    @user = User.create(params[:user]) # <--- this is wrong! User.create will actually attempt to save the record to the database.. you should be doing User.new instead
    if @customer.save
      session[:customer_profile_id] = @customer.id
      redirect_to customer_find_restaurant_profiles_url
    else
      # arent you going to display errors? this should probably be render :new instead so that you can redisplay the form with errors
      redirect_to new_customer_profile_url
    end
  end

  def edit
    @customer = CustomerProfile.find(params[:id])
  end

  def show
    @customer = CustomerProfile.find(params[:id])
  end

  def update
    @customer = CustomerProfile.find(params[:id])
	  if @customer.update_attributes(email: params[:customer_profile][:email]) && @customer.save
	    redirect_to customer_profiles_url
	  else
      # same issue here... dont you want to redisplay the form with validation errors?
	    redirect_to edit_customer_profiles_url(@customer)
	  end
  end
end