require "http"
require "json"

class Api::V1::AqiController < ApplicationController
    def show
        if logged_in?
            @profile = current_profile
            response = HTTP.get("https://api.waqi.info/feed/geo:#{@profile.latitude};#{@profile.longitude}/?token=7f992417654e5568c51283c92448fbd16798ef78")
            if response.status.code == 200
                responseBody = JSON.parse(response.body)
                aqi = responseBody["data"]["aqi"]
                aqi_threshold = @profile.aqi_threshold
                thresholdHit = aqi >= aqi_threshold
                render json: {
                    aqi: aqi,
                    aqi_threshold: aqi_threshold,
                    threshold_hit: thresholdHit
                }
            else
                render json: {
                    error: 'Failed to retrieve data from waqi server'
                }, status: 500
            end
        else
            render json: {
                error: 'You are not logged in'
            }, status: 401
        end
    end

end