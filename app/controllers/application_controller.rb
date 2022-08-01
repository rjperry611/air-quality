class ApplicationController < ActionController::API
    def user_data
        {
            id: current_user.id,
            username: current_user.username
        }
    end

    def login!
        session[:user_id] = @user.id
    end

    def logged_in?
        !!session[:user_id]
    end

    def current_user
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

    def current_profile
        @current_profile ||= Profile.find_by(user_id: current_user.id)
    end

    def logout!
        session.clear
    end
end
