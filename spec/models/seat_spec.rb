require 'spec_helper'

describe Seat do
  it { should belong_to(:customer_profile) }
  it { should allow_mass_assignment_of(:customer_profile_id)}
end
