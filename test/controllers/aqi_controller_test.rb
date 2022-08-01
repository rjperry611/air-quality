require "test_helper"
require "json"
require "webmock"
include WebMock::API
WebMock.enable!

class AqiControllerTest < ActionDispatch::IntegrationTest
    def setup_mock
        stub_request(:get, /.*api.waqi.info\/.*/).to_return(body: {data: {aqi: 20}}.to_json, status: 200)
    end

    def setup_bad_mock
        stub_request(:get, /.*api.waqi.info\/.*/).to_return(status: 400)
    end

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

    def get_aqi
        get "/api/v1/aqi"
        JSON.parse(response.body)
    end

    test "should return aqi" do
        create_user
        setup_mock
        response_body = get_aqi
        assert response_body["aqi"] == 20
        assert response_body["aqi_threshold"] == 12
        assert response_body["threshold_hit"]
    end

    test "should return 500 on failed aqi lookup" do
        create_user
        setup_bad_mock
        get_aqi
        assert_response 500
    end

    test "should return unauthorized if not logged in" do
        setup_mock
        get_aqi
        assert_response 401
    end

end