class CreateCarts < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.belongs_to :customer_profile
      t.belongs_to :restaurant_profile
      t.string     :status, default: "open"

      t.timestamps
    end
  end
end
