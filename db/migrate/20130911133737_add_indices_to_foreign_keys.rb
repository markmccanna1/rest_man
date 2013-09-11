class AddIndicesToForeignKeys < ActiveRecord::Migration
  def change
  	add_index :carts, :restaurant_profile_id
  	add_index :carts, :customer_profile_id
  	add_index :categories, :menu_id
  	add_index :floor_plans, :restaurant_profile_id
  	add_index :menu_items, :category_id
  	add_index :menus, :restaurant_profile_id
  	add_index :orders, :menu_item_id
  	add_index :orders, :cart_id
  	add_index :orders, :status
  	add_index :restaurant_profiles, :restaurant_name
  	add_index :restaurant_profiles, :city
  	add_index :restaurant_profiles, :state
  	add_index :seats, :customer_profile_id
  	add_index :seats, :floor_plan_id
  	add_index :seats, :html_id
  	add_index :tables, :floor_plan_id
  	add_index :tables, :html_id
  end
end
