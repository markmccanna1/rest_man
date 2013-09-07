class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation, :phone_number, :profileable_id

  has_secure_password

  attr_accessible :email, :password, :password_confirmation, :phone_number
  validates_presence_of (:email) # why are you using parentheses here!?
  validates_uniqueness_of (:email) # why are you using parentheses here!?

  belongs_to :profileable, polymorphic: true
end