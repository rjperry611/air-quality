class Api::V1::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @profile = Profile.new(profile_params)
        success = ActiveRecord::Base.transaction do
            @user.save
            @profile.user_id = @user.id
            unless @profile.valid?
                raise ActiveRecord::Rollback
            end
            @profile.save
        end
        if success
            login!
            render json: {
                status: :created,
                user: user_data,
                profile: current_profile
            }
        else
            render json: {
                errors: @user.errors.full_messages + @profile.errors.full_messages
            }, status: 400
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation)
    end

    def profile_params
        params.require(:profile).permit(:latitude, :longitude, :aqi_threshold)
    end
end