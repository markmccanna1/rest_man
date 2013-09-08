require 'spec_helper'

describe FloorPlan do
  it { should belong_to(:restaurant_profile) }
  it { should have_many(:tables) }

  it { should allow_mass_assignment_of(:restaurant_profile_id) }
end
