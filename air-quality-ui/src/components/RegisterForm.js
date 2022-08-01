import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'

export default function RegisterForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [aqiThreshold, setThreshold] = useState(100)

    const [validated, setValidated] = useState(false)
    const [duplicateUsername, setDuplicateUsername] = useState(false)
    const [autoDetectLocationError, setAutoDetectLocationError] = useState(false)

    const usernameOnChange = e => setUsername(e.target.value)
    const passwordOnChange = e => setPassword(e.target.value)
    const confirmPasswordOnChange = e => setConfirmPassword(e.target.value)
    const latitudeOnChange = e => setLatitude(e.target.value)
    const longitudeOnChange = e => setLongitude(e.target.value)
    const thresholdOnChange = e => setThreshold(e.target.value)

    function register(e) {
        e.preventDefault()
        setValidated(true)
        const form = e.currentTarget
        if(form.checkValidity()) {
            const data = {
                user: {
                    username: username.toLowerCase(),
                    password,
                    confirm_password: confirmPassword
                },
                profile: {
                    latitude,
                    longitude,
                    aqi_threshold: aqiThreshold
                }
            }
            fetch('/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res =>  res.json().then(data => ({status: res.status, body: data})))
            .then(res => {
                if(res.status === 200) {
                    props.signInCB()
                } else {
                    if(res.body.errors.includes("Username has already been taken")) {
                        setDuplicateUsername(true)
                    } else {
                        setDuplicateUsername(false)
                    }
                }
            })
        }
    }

    function detectLocation() {
        navigator.geolocation.getCurrentPosition(
            res => {
                setAutoDetectLocationError(false)
                setLatitude(res.coords.latitude)
                setLongitude(res.coords.longitude)
            },() => {
                setAutoDetectLocationError(true)
            }
        )
    }

    return (
        <Form validated={validated} onSubmit={register} noValidate>
            <Form.Group className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={usernameOnChange}
                    pattern="[a-zA-Z0-9-_]+"
                    required
                />
                <div className="invalid-feedback">Username required. Must be alphanumeric, dashes, and underscores</div>
                {duplicateUsername ? 
                    <div className="text-danger">Username already in use</div>
                : null}
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={passwordOnChange}
                    required
                />
                <div className="invalid-feedback">Password Required</div>
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    pattern={confirmPassword===password ? ".*" : ""
                    /* I would've prefered to use
                       className={confirmPassword===password ? "" : "is-invalid"}`
                       but that caused strange behavior where the error message would
                       display but the box would remain green with a check mark
                    */
                    }
                    value={confirmPassword}
                    onChange={confirmPasswordOnChange}
                    required
                />
                <div className="invalid-feedback">Passwords do not match</div>
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Position</Form.Label>
                <div className="container">
                    <div className="row">
                        <Form.Control className="col"
                            type="number"
                            placeholder="-90 through 90"
                            min="-90"
                            max="90"
                            step="0.00001"
                            value={latitude}
                            onChange={latitudeOnChange}
                            required
                        />
                        <Form.Control className="col"
                            type="number"
                            placeholder="-180 through 180"
                            min="-180"
                            max="180"
                            step="0.00001"
                            value={longitude}
                            onChange={longitudeOnChange}
                            required
                        />
                    </div>
                    <div className="row">
                        <div className="col">Latitude</div>
                        <div className="col">Longitude</div>
                    </div>
                </div>
                <Button variant="secondary" type="button" className="mt-1" onClick={detectLocation}>Auto Detect</Button>
                {autoDetectLocationError ? 
                    <div className="text-danger">Please allow location detection</div>
                : null}
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Threshold</Form.Label>
                <Form.Control
                    type="number"
                    value={aqiThreshold}
                    min="0"
                    onChange={thresholdOnChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Create Account</Button>
        </Form>
    )
}