class CreateCarts < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.belongs_to :user
      t.belongs_to :manager
      t.string     :status, default: "open"

      t.timestamps
    end
  end
end
