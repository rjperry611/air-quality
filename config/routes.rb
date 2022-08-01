Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]

      post   '/login',     to: 'sessions#create'
      delete '/logout',    to: 'sessions#destroy'
      get    '/logged_in', to: 'sessions#is_logged_in?'

      resource :profile, only: [:show, :update]
      
      get '/aqi', to: 'aqi#show'

      # TODO remove this
      delete :users, to: 'users#destroy'
    end
  end

end
