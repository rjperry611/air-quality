class Api::V1::ProfilesController < ApplicationController
    def show
        if logged_in?
            render json: {
                profile: current_profile
            }
        else
            render json: {
                error: 'You are not logged in'
            }, status: 401
        end
    end

    def update
        if logged_in?
            @profile = current_profile
            if @profile.update(profile_params)
                render json: {
                    status: 'Profile updated successfuly'
                }
            else
                render json: {
                    errors: @profile.errors.full_messages
                }, status: 400
            end
        else
            render json: {
                error: 'You are not logged in'
            }, status: 401
        end
    end

    private 

    def profile_params
        params.require(:profile).permit(:latitude, :longitude, :aqi_threshold)
    end

end