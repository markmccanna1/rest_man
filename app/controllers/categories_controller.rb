class CategoriesController < ApplicationController
before_filter :authorize_restaurant, :except => [:show]

 def import
   @menu = Menu.find(params[:id])
   @category = Category.import(params[:file], @menu)

   # does this controller action respond to other request formats other than html? if not, the respond_to |format|
   # is unnecessary
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