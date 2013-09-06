class MenuItemsController < ApplicationController
  def index
  end

  def new
  	@menu_item = MenuItem.new
  	@category = Category.find(params[:category_id])
  	@menu = Menu.find(params[:menu_id])
  	@restaurant_profile = RestaurantProfile.find(params[:restaurant_profile_id])
  end

  def create
  	@category = Category.find(params[:category_id])
  	@category.menu_items.create(params[:menu_item])
  	redirect_to new_restaurant_profile_menu_category_menu_item_path
  end
end