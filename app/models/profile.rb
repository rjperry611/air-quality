class Profile < ApplicationRecord
  belongs_to :user

  validates :latitude, presence: true
  validates :latitude, numericality: {greater_than_or_equal_to: -90, less_than_or_equal_to: 90}
  validates :longitude, presence: true
  validates :longitude, numericality: {greater_than_or_equal_to: -180, less_than_or_equal_to: 180}
  validates :aqi_threshold, presence: true
  validates :aqi_threshold, numericality: {greater_than_or_equal_to: 0}
end
