class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.string :name, :null => false
      t.string :description
      t.belongs_to :category
      t.integer :price

      t.timestamps
    end
  end
end
