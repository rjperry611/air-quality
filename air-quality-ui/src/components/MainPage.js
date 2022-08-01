import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {useEffect, useState, useCallback} from 'react'
import EditProfileForm from './EditProfileForm'

export default function MainPage(props) {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [editingProfile, setEditingProfile] = useState(false)
    const [aqi, setAqi] = useState(0)
    const [thresholdHit, setThresholdHit] = useState(false)

    const backgroundColor = thresholdHit ? 'bg-danger' : 'bg-success'
    const message = `The air quality is ${thresholdHit ? 'worse' : 'better'} than the threshold you set`

    const editProfileForm = <EditProfileForm
                                profile={props.profile}
                                setProfile={props.setProfile}
                                submitEditCB={submitEditCB}
                                cancelEditCB={submitEditCB}
                            />

    function submitEditCB() {
        setEditingProfile(false)
        props.reloadProfile()
        forceUpdate()
    }

    function signOut() {
        fetch('/api/v1/logout', {
            method: 'DELETE'
        })
        .then(props.signOutCB)
    }
     
    function getAqi() {
        fetch('/api/v1/aqi', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            setAqi(res.aqi)
            setThresholdHit(res.threshold_hit)
        })
    }

    // Refresh every 10 seconds
    useEffect(() => {
        if(!editingProfile) {
            getAqi()

            const interval = setInterval(() => {
                getAqi()
            }, 10000)

            return () => clearInterval(interval)
        }
    }, [editingProfile])

    return (
        <div className="h-100">
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand>Air Quality App</Navbar.Brand>
                    <Button
                        onClick={() => setEditingProfile(true)}
                        submitEditCB={submitEditCB}
                        profile={props.profile}
                        setProfile={props.setProfile}
                        className="float-right"
                    >Edit Profile</Button>
                    <Button onClick={signOut} className="float-right">Sign Out</Button>
                </Container>
            </Navbar>
            {editingProfile ? editProfileForm : ''}
            <div className={`h-100 text-center ${backgroundColor}`}>
                <h1>{message}</h1>
                <h5>AQI: {aqi}</h5>
                <h5>Threshold: {props.profile.aqiThreshold}</h5>
            </div>
        </div>
    )
}