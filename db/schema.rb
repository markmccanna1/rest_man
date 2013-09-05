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

ActiveRecord::Schema.define(:version => 20130905174125) do

  create_table "carts", :force => true do |t|
    t.integer  "customer_profile_id"
    t.integer  "restaurant_profile_id"
    t.string   "status",                :default => "open"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
  end

  create_table "menu_items", :force => true do |t|
    t.string   "name",        :null => false
    t.string   "description"
    t.integer  "category_id"
    t.integer  "price"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "orders", :force => true do |t|
    t.string   "status",       :default => "pending"
    t.integer  "menu_item_id"
    t.integer  "cart_id"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
  end

end
