class AddPositionDimensionsTables < ActiveRecord::Migration
  def change
    add_column :tables, :position_x, :string, index: true
    add_column :tables, :position_y, :string, index: true
    add_column :tables, :width, :string, index: true
    add_column :tables, :height, :string, index: true
    add_column :tables, :html_id, :string, index: true
  end
end
