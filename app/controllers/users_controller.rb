class UsersController < ApplicationController

  include UserHelper

  def create
	@user = User.new(params[:user])

	if @user.save
		session[:user_id] = user.id
		redirect_to user_url(session[:user_id])
	else
		redirect_to new_user_url
	end
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
	if @user.update_attributes(email: params[:user][:email]) && @user.save
	  redirect_to user_url
	else
	  redirect_to edit_user_url(@user)
	end
  end
end