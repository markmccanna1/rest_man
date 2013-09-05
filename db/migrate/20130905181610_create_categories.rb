class CreateCategories < ActiveRecord::Migration
  def change
  	create_table :categories do |t|
  	  t.string :title
  	  t.belongs_to :menu
  	end
  end
end
