require 'spec_helper'

describe RestaurantProfile do
  let!(:restaurant_profile) {FactoryGirl.create(:restaurant_profile)}
  it 'has a valid factory' do
  	restaurant_profile.should be_valid
  end
  it 'validates presence of street address' do
    FactoryGirl.build(:restaurant_profile, street_address: nil).should_not be_valid
  end
  it 'validates presence of account holder first name' do
    FactoryGirl.build(:restaurant_profile, account_holder_first_name: nil).should_not be_valid
  end
  it 'validates presence of account holder last name' do
    FactoryGirl.build(:restaurant_profile, account_holder_last_name: nil).should_not be_valid
  end
  it 'validates presence of city' do
    FactoryGirl.build(:restaurant_profile, city: nil).should_not be_valid
  end
  it 'validates presence of state' do
    FactoryGirl.build(:restaurant_profile, state: nil).should_not be_valid
  end
  it 'validates presence of ZIP' do
    FactoryGirl.build(:restaurant_profile, zip_code: nil).should_not be_valid
  end
  it 'validates presence of restaurant name' do
    FactoryGirl.build(:restaurant_profile, restaurant_name: nil).should_not be_valid
  end
  it { should have_one(:user) }
  it { should have_many(:menus) }
end
