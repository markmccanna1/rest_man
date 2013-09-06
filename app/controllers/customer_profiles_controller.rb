class CustomerProfilesController < ApplicationController

  include UserHelper

  def create
    @customer = CustomerProfile.new(params[:customer_profile])
    @user = User.create(params[:user])
	if @customer.save
		session[:customer_id] = @customer.id
		redirect_to customer_profiles_url(session[:customer_id])
	else
		redirect_to new_customer_new_url
	end
  end

  def new
    @customer = CustomerProfile.new
    @customer.build_user
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