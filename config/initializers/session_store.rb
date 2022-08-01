if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_air-quality', domain: 'name-of-you-app-json-api'
else
  Rails.application.config.session_store :cookie_store, key: '_air-quality'
end