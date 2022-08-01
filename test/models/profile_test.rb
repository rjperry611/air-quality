require "test_helper"

class ProfileTest < ActiveSupport::TestCase
  def genUserId
    user = User.new(username: "test", password_digest: "sample")
    user.save
    user.id
  end

  test "should save valid profile" do
    user_id = genUserId
    profile = Profile.new(latitude: 1, longitude: 2, aqi_threshold: 3, user_id: user_id)
    assert profile.save
  end

  test "should not save profile without required fields" do
    user_id = genUserId
    profile = Profile.new(latitude: 1, longitude: 2, aqi_threshold: 2)
    assert_not profile.save
    profile = Profile.new(latitude: 1, longitude: 2, user_id: user_id)
    assert_not profile.save
    profile = Profile.new(latitude: 1, aqi_threshold: 2, user_id: user_id)
    assert_not profile.save
    profile = Profile.new(longitude: 1, aqi_threshold: 2, user_id: user_id)
    assert_not profile.save
  end

  test "should not save profile for out of range fields" do
    user_id = genUserId
    profile = Profile.new(latitude: 1000, longitude: 2, aqi_threshold: 3, user_id: user_id)
    assert_not profile.save
    profile = Profile.new(latitude: 1, longitude: 2000, aqi_threshold: 3, user_id: user_id)
    assert_not profile.save
    profile = Profile.new(latitude: 1, longitude: 2, aqi_threshold: -3, user_id: user_id)
    assert_not profile.save
  end

  test "should not save profile for wrong data types" do
    user_id = genUserId
    profile = Profile.new(latitude: "x", longitude: 2, aqi_threshold: 3, user_id: user_id)
    assert_not profile.save
    profile = Profile.new(latitude: 1, longitude: "x", aqi_threshold: 3, user_id: user_id)
    assert_not profile.save
    profile = Profile.new(latitude: 1, longitude: 2, aqi_threshold: "x", user_id: user_id)
    assert_not profile.save
    profile = Profile.new(latitude: 1, longitude: 2, aqi_threshold: 3, user_id: "x")
    assert_not profile.save
  end
end
