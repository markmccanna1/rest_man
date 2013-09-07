class AddLastCartProcessedColumn < ActiveRecord::Migration
  def up
    add_column :restaurant_profiles, :last_cart_processed_at, :timestamp, default: Time.now
  end

  def down
    remove_column :restaurant_profiles, :last_cart_processed_at
  end
end
