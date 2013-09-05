class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :status, default: "pending"
      t.belongs_to :menu_item
      t.belongs_to :cart

      t.timestamps
    end
  end
end
