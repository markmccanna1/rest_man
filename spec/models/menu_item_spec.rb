require 'spec_helper'

describe MenuItem do
  
  it { should have_many(:orders) }
  it { should belong_to(:category) }

  it { should validate_presence_of(:category_id) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:price) }
  it { should validate_uniqueness_of(:name) }

  it { should allow_mass_assignment_of(:name)}
  it { should allow_mass_assignment_of(:description)}
  it { should allow_mass_assignment_of(:price)}
  it { should allow_mass_assignment_of(:category_id)}

end
