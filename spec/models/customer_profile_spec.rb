require 'spec_helper'

describe CustomerProfile do
  let!(:customer_profile) {FactoryGirl.create(:customer_profile)}
  it 'has a valid factory' do
  	customer_profile.should be_valid
  end
  it { should have_one(:user) }
end