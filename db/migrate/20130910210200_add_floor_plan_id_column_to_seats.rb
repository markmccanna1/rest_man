class AddFloorPlanIdColumnToSeats < ActiveRecord::Migration
  def change
    add_column :seats, :floor_plan_id, :integer, :index => true
  end
end
