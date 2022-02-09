# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string
#  full_name       :string
#  role            :string
#  authrized       :boolean
#  admin           :boolean
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email, on: :create, message: "can't be blank"
  validates :password, length: {minimum: 8, message: "must have at least 8 characters"}
  validates_uniqueness_of :email, on: [:create, :edit], message: "is taken"

  has_many :keys
end
