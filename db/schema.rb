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

ActiveRecord::Schema.define(:version => 20130910210200) do

  create_table "carts", :force => true do |t|
    t.integer  "customer_profile_id"
    t.integer  "restaurant_profile_id"
    t.string   "status",                :default => "open"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
  end

  create_table "categories", :force => true do |t|
    t.string  "title"
    t.integer "menu_id"
  end

  create_table "customer_profiles", :force => true do |t|
    t.string   "zip_code"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "examples", :force => true do |t|
    t.string   "text"
    t.integer  "restaurant_profile_id"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
  end

  create_table "floor_plans", :force => true do |t|
    t.integer  "restaurant_profile_id"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
  end

  create_table "menu_items", :force => true do |t|
    t.string   "name",        :null => false
    t.string   "description"
    t.integer  "category_id"
    t.integer  "price"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "menus", :force => true do |t|
    t.string   "title"
    t.integer  "restaurant_profile_id"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
  end

  create_table "orders", :force => true do |t|
    t.string   "status",       :default => "pending"
    t.integer  "menu_item_id"
    t.integer  "cart_id"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
  end

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
    t.datetime "last_cart_processed_at",    :default => '2013-09-07 21:50:15'
  end

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
