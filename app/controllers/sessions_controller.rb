class SessionsController < ApplicationController
  include UserHelper

  def new
  end

  def create
    @user = User.find_by_email(params[:user][:email])
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to customer_profile_url(session[:user_id])
    else
      @user = User.new
      render 'new'
    end
  end

  def destroy
    session.clear
    redirect_to root_url :notice => "You've successfully logged out"
  end
end