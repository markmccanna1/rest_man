class CreateManagerProfiles < ActiveRecord::Migration
  def change
    create_table :restaurant_profiles do |t|
      t.string :restaurant_name
      t.string :account_holder_first_name
      t.string :account_holder_last_name
      t.string :restaurant_url
      t.string :street_address
      t.string :street_address_2
      t.string :city
      t.string :state
      t.string :zip_code
      
      t.timestamps
    end
  end
end
