class CreateFloorPlans < ActiveRecord::Migration
  def change
    create_table :floor_plans do |t|
      t.belongs_to :restaurant_profile

      t.timestamps
    end
  end
end
