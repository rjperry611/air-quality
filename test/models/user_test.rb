require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should save new user" do
    user = User.new(username: "test", password_digest: "sample")
    assert user.save
  end

  test "should not save duplicate user" do
    user = User.new(username: "test", password_digest: "sample")
    assert user.save
    user = User.new(username: "test", password_digest: "sample")
    assert_not user.save
  end

  test "should not save user without required fields" do
    user = User.new(username: "test")
    assert_not user.save
    user = User.new(password_digest: "sample")
    assert_not user.save
  end
end
