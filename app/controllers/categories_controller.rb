class CategoriesController < ApplicationController

before_filter :confirm_logged_in
before_filter :authorize_restaurant
 
 def import
   @menu = Menu.find(params[:id])
   @category = Category.import(params[:file], @menu)
     if @category == "success"
       flash[:notice] = 'Your Menu Uploaded Successfully!'
       redirect_to restaurant_dashboard_path
      else
        flash[:notice] = 'Menu Upload Failed'		
      	redirect_to restaurant_dashboard_path
     end
  end
end