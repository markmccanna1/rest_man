require 'spec_helper'

describe User do
  let!(:user) {FactoryGirl.create(:user)}
  it 'has a valid factory' do
  	user.should be_valid
  end
  it 'validates presence of email' do
    FactoryGirl.build(:user, email: nil).should_not be_valid
  end
  it 'validates uniqueness of email' do
  	FactoryGirl.build(:user, email: "nedky@gmail.com").should_not be_valid
  end
  it { should belong_to (:profileable) }
end