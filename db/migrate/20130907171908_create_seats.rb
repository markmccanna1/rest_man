class CreateSeats < ActiveRecord::Migration
  def change
    create_table :seats do |t|
      t.belongs_to :customer_profile

      t.timestamps
    end
  end
end
