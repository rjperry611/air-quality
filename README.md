# Air Quality App (Sample Project)

This application performs two key functionalities:
1) Allows users to create an account that they can log in with
2) Displays whether or not the air quality in the user's configured region is above or below the user's configured threshold

The backend of the application is written in Ruby on Rails and the front end uses React.JS.

When a user first visits the app, they will find a log in page. Here, they can choose to log in if they have already created a user or register if they need to create a new user. To register, they will enter a username, password and password confirmation. For their profile, they will also enter their location and aqi threshold. The location will be entered as a latitude and longitude coordinate. This decision was made because there is a limitation where the service I am using to collect aqi information does not have a list of cities that they support so using coordinates was the simplest choice for this proof of concept. There is a button available to automatically find and populate the user's location.

Once the user signs in, they will see the main page which will let them know whether or not the air quality in their location is above or below their threshold. There is also buttons at the top to log out and to edit their profile. In the profile editing page, they can change their position and threshold values.
