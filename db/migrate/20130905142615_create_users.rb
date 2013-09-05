class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :phone_number
      t.string :password_digest
      t.references :profileable, polymorphic: true
      
      t.timestamps
    end
  end
end
