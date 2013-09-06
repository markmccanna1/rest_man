class CustomerProfilesController < ApplicationController

  before_filter :authorize_customer

  def new
    @customer = CustomerProfile.new
    @customer.build_user
  end

  def create
    @customer = CustomerProfile.new(params[:customer_profile])
    @user = User.create(params[:user])
    if @customer.save
      session[:customer_profile_id] = @customer.id
      redirect_to customer_find_restaurant_profiles_url
    else
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
	    redirect_to edit_customer_profiles_url(@customer)
	  end
  end
end