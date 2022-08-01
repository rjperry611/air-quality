require "test_helper"
require "json"

class SessionsControllerTest < ActionDispatch::IntegrationTest
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

    def log_in
        post "/api/v1/login", params: {
            user: {
                username: :name,
                password: :pass
            }
        }
    end

    def log_out
        delete "/api/v1/logout"
    end

    def is_logged_in?
        get "/api/v1/logged_in"
        body = JSON.parse(response.body)
        body["logged_in"]
    end

    test "should be logged out by default" do
        assert_not is_logged_in?
    end

    test "should be logged in after create user" do
        create_user
        assert is_logged_in?
    end

    test "should be logged out after failed create user" do
        post "/api/v1/users", params: {user: {username: :name}, profile: {latitude: 12.12}}
        assert_not is_logged_in?
    end

    test "should log in and out" do
        create_user
        assert is_logged_in?
        log_out
        assert_not is_logged_in?
        log_in
        assert is_logged_in?
    end

end