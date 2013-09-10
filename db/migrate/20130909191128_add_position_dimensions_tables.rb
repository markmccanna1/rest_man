class AddPositionDimensionsTables < ActiveRecord::Migration
  def change
    add_column :tables, :position_x, :string
    add_column :tables, :position_y, :string
    add_column :tables, :width, :string
    add_column :tables, :height, :string
    add_column :tables, :html_id, :string
  end
end
