require 'spec_helper'

describe Menu do
  let!(:menu) {FactoryGirl.create(:menu)}
  it 'has a valid factory' do
  	menu.should be_valid
  end
 it 'should validate on title' do
 	FactoryGirl.build(:menu, title: nil).should_not be_valid
 end
 it { should belong_to (:restaurant_profile) }
end