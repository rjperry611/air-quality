class User < ApplicationRecord
    has_one :profiles
    has_secure_password
    validates :username, presence: true
    validates :username, uniqueness: true
end
