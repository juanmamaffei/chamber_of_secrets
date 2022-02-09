# == Schema Information
#
# Table name: keys
#
#  id               :integer          not null, primary key
#  title            :string
#  description      :string
#  user_id          :integer          not null
#  authorized_users :text             is an Array
#  expiration       :date
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  username         :string
#  additional_info  :text
#
# Indexes
#
#  index_keys_on_user_id  (user_id)
#

class Key < ApplicationRecord
  belongs_to :user
  encrypts :title, deterministic: true
  encrypts :description, :username, :additional_info
end
