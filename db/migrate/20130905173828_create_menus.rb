class CreateMenus < ActiveRecord::Migration
  def change
  	create_table :menus do |t|
  	  t.string :title
  	  t.references :manager_profile
  	end
  end
end
