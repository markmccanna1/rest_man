# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130911133737) do

  create_table "carts", :force => true do |t|
    t.integer  "customer_profile_id"
    t.integer  "restaurant_profile_id"
    t.string   "status",                :default => "open"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
  end

  add_index "carts", ["customer_profile_id"], :name => "index_carts_on_customer_profile_id"
  add_index "carts", ["restaurant_profile_id"], :name => "index_carts_on_restaurant_profile_id"

  create_table "categories", :force => true do |t|
    t.string  "title"
    t.integer "menu_id"
  end

  add_index "categories", ["menu_id"], :name => "index_categories_on_menu_id"

  create_table "customer_profiles", :force => true do |t|
    t.string   "zip_code"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "floor_plans", :force => true do |t|
    t.integer  "restaurant_profile_id"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
  end

  add_index "floor_plans", ["restaurant_profile_id"], :name => "index_floor_plans_on_restaurant_profile_id"

  create_table "menu_items", :force => true do |t|
    t.string   "name",        :null => false
    t.string   "description"
    t.integer  "category_id"
    t.integer  "price"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "menu_items", ["category_id"], :name => "index_menu_items_on_category_id"

  create_table "menus", :force => true do |t|
    t.string  "title"
    t.integer "restaurant_profile_id"
  end

  add_index "menus", ["restaurant_profile_id"], :name => "index_menus_on_restaurant_profile_id"

  create_table "orders", :force => true do |t|
    t.string   "status",       :default => "pending"
    t.integer  "menu_item_id"
    t.integer  "cart_id"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
  end

  add_index "orders", ["cart_id"], :name => "index_orders_on_cart_id"
  add_index "orders", ["menu_item_id"], :name => "index_orders_on_menu_item_id"
  add_index "orders", ["status"], :name => "index_orders_on_status"

  create_table "restaurant_profiles", :force => true do |t|
    t.string   "restaurant_name"
    t.string   "account_holder_first_name"
    t.string   "account_holder_last_name"
    t.string   "restaurant_url"
    t.string   "street_address"
    t.string   "street_address_2"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.datetime "created_at",                                                   :null => false
    t.datetime "updated_at",                                                   :null => false
    t.datetime "last_cart_processed_at",    :default => '2013-09-11 13:53:12'
  end

  add_index "restaurant_profiles", ["city"], :name => "index_restaurant_profiles_on_city"
  add_index "restaurant_profiles", ["restaurant_name"], :name => "index_restaurant_profiles_on_restaurant_name"
  add_index "restaurant_profiles", ["state"], :name => "index_restaurant_profiles_on_state"

  create_table "seats", :force => true do |t|
    t.integer  "customer_profile_id"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.integer  "table_id"
    t.string   "position_x"
    t.string   "position_y"
    t.string   "width"
    t.string   "height"
    t.string   "html_id"
    t.integer  "floor_plan_id"
  end

  add_index "seats", ["customer_profile_id"], :name => "index_seats_on_customer_profile_id"
  add_index "seats", ["floor_plan_id"], :name => "index_seats_on_floor_plan_id"
  add_index "seats", ["html_id"], :name => "index_seats_on_html_id"

  create_table "tables", :force => true do |t|
    t.integer  "floor_plan_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.string   "position_x"
    t.string   "position_y"
    t.string   "width"
    t.string   "height"
    t.string   "html_id"
  end

  add_index "tables", ["floor_plan_id"], :name => "index_tables_on_floor_plan_id"
  add_index "tables", ["html_id"], :name => "index_tables_on_html_id"

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "phone_number"
    t.string   "password_digest"
    t.integer  "profileable_id"
    t.string   "profileable_type"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

end
