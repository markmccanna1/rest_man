class CustomerProfilesController < ApplicationController

  before_filter :authorize_customer, :except => [:new, :create]

  include UserHelper

  def index

  end

  def create
    @customer = CustomerProfile.new(params[:customer_profile])
    @user = User.new(params[:user])
	  if @customer.save
		  session[:customer_id] = @customer.id
		  redirect_to customer_find_restaurant_profiles_url
	  else
		  render :new
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
	    render :edit
	  end
  end
end
