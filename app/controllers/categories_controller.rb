class CategoriesController < ApplicationController
before_filter :authorize_restaurant, :except => [:show] 
 
 def import
   Category.import(params[:file])
   @menu = Menu.find(params[:id])
   redirect_to root_url
  end
end