class MenusController < ApplicationController
  before_filter :authorize_restaurant, :except => [:show]
  def new
  	@menu = Menu.new
  	render :partial => 'form'
  end

  def create
  	@menu = Menu.new(title: params[:menu_title], restaurant_profile_id: params[:restaurant_profile_id])
  	if @menu.save
  	  render :partial => 'import_form'
    else
      flash[:notice] = 'Please Enter a Valid Menu Title'
    end
  end

  def import
    Menu.import(params[:file])
    redirect_to root_path
  end
end
