class CreateCategories < ActiveRecord::Migration
  def up
  	create_table :categories do |t|
  	  t.string :title
  	  t.references :menu
  	end
  end
end
