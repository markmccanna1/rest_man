require 'spec_helper'

describe 'Item creation panel' do
  let(:user) { FactoryGirl.create(:user) }
  let(:restaurant_profile) { FactoryGirl.create(:restaurant_profile) }
  let(:menu) { FactoryGirl.create(:menu) }
  let(:category) { FactoryGirl.create(:categroy) }
  context 'when user visits the create an item page' do
  	it "has a form to create a new menu item" do
	 
	    visit new_restaurant_profile_menu_category_menu_item_url
      new_restaurant_profile_menu_category_menu_item

	    expect {
	  	  fill_in "item_name", with: "Monte Cristo"
        fill_in "description", with: "Deep fried sandwichey goodness"
        fill_in "price", with: 1400
	    }.to 
    end
  end
end