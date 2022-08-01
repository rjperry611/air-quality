import './App.css';
import MainPage from './components/MainPage'
import SignInPage from './components/SignInPage'
import {useEffect, useState} from 'react'

function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [profile, setProfile] = useState({})

  const mainPageComponent = <MainPage
                              profile={profile}
                              reloadProfile={loadProfile}
                              setProfile={setProfile}
                              signOutCB={() => setSignedIn(false)}
                            />
  const signInPageComponent = <SignInPage signInCB={() => setSignedIn(true)}/>

  function checkLoggedIn(cb) {
    fetch('/api/v1/logged_in', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      setSignedIn(res.logged_in)
      cb(res.logged_in)
    })
  }

  function loadProfile() {
    fetch('/api/v1/profile', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      setProfile({
        latitude: res.profile.latitude,
        longitude: res.profile.longitude,
        aqiThreshold: res.profile.aqi_threshold
      })
    })
  }

  useEffect(() => {
    checkLoggedIn(loggedIn => loggedIn ? loadProfile() : null)
  }, [signedIn])

  return (
    <div>
      {signedIn ? mainPageComponent : signInPageComponent}
    </div>
  );
}

export default App;
