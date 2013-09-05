require 'spec_helper'

describe Cart do

  it { should belong_to(:user) }
  it { should belong_to(:order) }
  it { should belong_to(:manager) }

  it { should allow_mass_assignment_of(:user_id)}
  it { should allow_mass_assignment_of(:order_id)}
  it { should allow_mass_assignment_of(:manager_id)}

  it "should default status to open" do
    cart = FactoryGirl.create(:cart)
    cart.status.should eq("open")
  end

end
