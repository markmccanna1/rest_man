require 'spec_helper'

describe ManagerProfile do
  let!(:manager_profile) {FactoryGirl.create(:manager_profile)}
  it 'has a valid factory' do
  	manager_profile.should be_valid
  end
  it 'validates presence of street address' do
    FactoryGirl.build(:manager_profile, street_address: nil).should_not be_valid
  end
  it 'validates presence of account holder first name' do
    FactoryGirl.build(:manager_profile, account_holder_first_name: nil).should_not be_valid
  end
  it 'validates presence of account holder last name' do
    FactoryGirl.build(:manager_profile, account_holder_last_name: nil).should_not be_valid
  end
  it 'validates presence of city' do
    FactoryGirl.build(:manager_profile, city: nil).should_not be_valid
  end
  it 'validates presence of state' do
    FactoryGirl.build(:manager_profile, state: nil).should_not be_valid
  end
  it 'validates presence of ZIP' do
    FactoryGirl.build(:manager_profile, zip_code: nil).should_not be_valid
  end
  it 'validates presence of restaurant name' do
    FactoryGirl.build(:manager_profile, restaurant_name: nil).should_not be_valid
  end
  it 'validates uniqueness of restaurant name' do
    FactoryGirl.build(:manager_profile, restaurant_name: "Bennigan's").should_not be_valid
  end
  it { should have_one(:user) }
end