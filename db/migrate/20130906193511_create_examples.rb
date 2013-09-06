class CreateExamples < ActiveRecord::Migration
  def change
    create_table :examples do |t|
      t.string :text
      t.belongs_to :restaurant_profile
      t.timestamps
    end
  end
end
