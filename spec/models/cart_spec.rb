require 'spec_helper'

describe Cart do

  it { should belong_to(:customer_profile) }
  it { should have_many(:orders) }
  it { should belong_to(:restaurant_profile) }

  it { should allow_mass_assignment_of(:customer_profile_id)}
  it { should allow_mass_assignment_of(:restaurant_profile_id)}

  it "should default status to open" do
    cart = FactoryGirl.create(:cart)
    cart.status.should eq("open")
  end

end
