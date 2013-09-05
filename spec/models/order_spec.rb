require 'spec_helper'

describe Order do
  
  it { should belong_to(:cart) }
  it { should belong_to(:menu_item) }

  it { should validate_presence_of(:cart_id) }
  it { should validate_presence_of(:menu_item_id) }

  it { should allow_mass_assignment_of(:cart_id) }
  it { should allow_mass_assignment_of(:menu_item_id) }

  it "should default status to pending" do
    order = FactoryGirl.create(:order)
    order.status.should eq("pending")
  end
  
end
