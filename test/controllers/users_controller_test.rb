require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
    sample_data = {
        user: {
            username: :name,
            password: :pass,
            password_confirmation: :pass
        },
        profile: {
            latitude: 12.12,
            longitude: -62.9,
            aqi_threshold: 12
        }
    }

    invalid_data = {
        user: {
            username: :name,
            password: :pass,
            password_confirmation: :pass
        },
        profile: {
            latitude: "j",
            longitude: -62.9,
            aqi_threshold: 12
        }
    }

    test "should create a user" do
        post "/api/v1/users", params: sample_data
        assert_response :success
    end

    test "should not duplicate a user" do
        post "/api/v1/users", params: sample_data
        assert_response :success
        post "/api/v1/users", params: sample_data
        assert_response 400
    end

    test "should not create invalid user" do
        post "/api/v1/users", params: invalid_data
        assert_response 400
    end
end