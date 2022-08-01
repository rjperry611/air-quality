require "test_helper"
require "json"

class ProfilesControllerTest < ActionDispatch::IntegrationTest
    def create_user
        post "/api/v1/users", params: {
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
    end

    def log_out
        delete "/api/v1/logout"
    end

    def update_profile
        put "/api/v1/profile", params: {
            profile: {
                latitude: 32.12,
                longitude: -62.9,
                aqi_threshold: 12
            }
        }
    end

    def get_profile
        get "/api/v1/profile"
        JSON.parse(response.body)["profile"]
    end

    test "should get profile" do
        create_user
        profile = get_profile
        assert_response :success
        assert profile["latitude"].to_f == 12.12
    end

    test "should not get profile if logged out" do
        create_user
        log_out
        get_profile
        assert_response 401
    end

    test "should update profile" do
        create_user
        update_profile
        assert_response :success
        profile = get_profile
        assert profile["latitude"].to_f == 32.12
    end

    test "should not update profile if logged out" do
        create_user
        log_out
        update_profile
        assert_response 401
    end

end