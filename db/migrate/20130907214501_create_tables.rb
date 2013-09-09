class CreateTables < ActiveRecord::Migration
  def change
    create_table :tables do |t|
      t.belongs_to :floor_plan

      t.timestamps
    end
  end
end
