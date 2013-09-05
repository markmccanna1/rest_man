class CreateMenus < ActiveRecord::Migration
  def change
  	create_table :menus do |t|
  	  t.string :title
  	  t.belongs_to :restaurant_profile
  	end
  end
end
