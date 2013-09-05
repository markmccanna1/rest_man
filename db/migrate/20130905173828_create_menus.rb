class CreateMenus < ActiveRecord::Migration
  def change
  	create_table :menus do |t|
  	  t.string :title
  	  t.references :restaurant_profile
  	end
  end
end
