class CategoriesController < ApplicationController
before_filter :authorize_restaurant, :except => [:show] 
 
 def import
   @menu = Menu.find(params[:id])
   @category = Category.import(params[:file], @menu)
   respond_to do |format|
     if @category == "success"
       format.html {
       flash[:notice] = 'Your Menu Uploaded Successfully!'
       redirect_to restaurant_dashboard_path
       }
      else
      	format.html {
        flash[:notice] = 'Menu Upload Failed'		
      	}
      	redirect_to restaurant_dashboard_path
     end
   end
  end
end