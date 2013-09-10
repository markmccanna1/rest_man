class AddPositionDimensionsSeats < ActiveRecord::Migration
  def change
    add_column :seats, :position_x, :string, index: true
    add_column :seats, :position_y, :string, index: true
    add_column :seats, :width, :string, index: true
    add_column :seats, :height, :string, index: true
    add_column :seats, :html_id, :string, index: true
  end
end
