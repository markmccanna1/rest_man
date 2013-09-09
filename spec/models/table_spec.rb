require 'spec_helper'

describe Table do
  it { should belong_to(:floor_plan) }
  it { should have_many(:seats) }

  it { should allow_mass_assignment_of(:floor_plan_id)}
end
