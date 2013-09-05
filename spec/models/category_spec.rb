require 'spec_helper'

describe Category do
  let(:category) { Category.new(title: "Entrees") }
  it 'should validate title' do
  	Category.new(title: nil).should_not be_valid
  end
  it { should belong_to (:menu) }
  it { should have_many (:menu_itmes) }
end