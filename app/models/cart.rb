class Cart < ActiveRecord::Base
  attr_accessible :user_id, :manager_id

  belongs_to :user
  belongs_to :manager
  has_many :orders
end
