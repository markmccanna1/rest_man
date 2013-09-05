class User < ActiveRecord::Base
  has_secure_password

  validates_presence_of (:email)
  validates_uniqueness_of (:email)
  
  belongs_to :profileable, polymorphic: true
end