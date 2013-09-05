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

ActiveRecord::Schema.define(:version => 20130905181610) do

  create_table "categories", :force => true do |t|
    t.string  "title"
    t.integer "menu_id"
  end

  create_table "customer_profiles", :force => true do |t|
    t.string   "zip_code"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
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
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "menus", :force => true do |t|
    t.string  "title"
    t.integer "restaurant_profile_id"
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
