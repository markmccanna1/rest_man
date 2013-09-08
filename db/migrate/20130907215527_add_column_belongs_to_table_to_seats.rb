class AddColumnBelongsToTableToSeats < ActiveRecord::Migration
  def up
    add_column :seats, :table_id, :integer
  end

  def down
    remove_column :seats, :table_id, :integer
  end
end
