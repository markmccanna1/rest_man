class MenusController < ApplicationController
  before_filter :authorize_restaurant, :except => [:show]
  def new
  	@menu = Menu.new
  	render :partial => 'form'
  end

  def create
  	@menu = Menu.new(title: params[:menu_title], restaurant_profile_id: params[:restaurant_profile_id])
  	# what happens if @menu doesnt successfully save?
    if @menu.save
  	render :partial => 'import_form'
    end
  end
end