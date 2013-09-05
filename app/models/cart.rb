class Cart < ActiveRecord::Base
  attr_accessible :user_id, :order_id, :manager_id

  belongs_to :user
  belongs_to :order
  belongs_to :manager
end
