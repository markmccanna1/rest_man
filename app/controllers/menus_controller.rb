class MenusController < ApplicationController
  before_filter :authorize_restaurant, :except => [:show]
  def new
  	@menu = Menu.new
  	render :partial => 'form'
  end

  def create
  end

  def import
    Menu.import(params[:file])
    redirect_to root_path
  end
end