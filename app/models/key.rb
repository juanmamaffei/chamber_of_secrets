class Key < ApplicationRecord
  belongs_to :user
  encrypts :title, deterministic: true
  encrypts :description #, deterministic: true, previous: { deterministic: false }
end
