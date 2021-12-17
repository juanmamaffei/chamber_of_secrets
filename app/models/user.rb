class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email, on: :create, message: "can't be blank"
  validates_uniqueness_of :email, on: [:create, :edit], message: "must be unique"
  validates :password, length: {minimum: 8, message: "must have at least 8 characters"}

  has_many :keys
end
