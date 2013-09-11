class AddPositionDimensionsSeats < ActiveRecord::Migration
  def change
    add_column :seats, :position_x, :string
    add_column :seats, :position_y, :string
    add_column :seats, :width, :string
    add_column :seats, :height, :string
    add_column :seats, :html_id, :string
  end
end
