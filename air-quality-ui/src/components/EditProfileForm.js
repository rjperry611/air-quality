import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CloseButton from 'react-bootstrap/CloseButton';
import { useEffect, useState } from 'react'

export default function EditProfileForm(props) {
    const [latitude, setLatitude] = useState(props.profile.latitude)
    const [longitude, setLongitude] = useState(props.profile.longitude)
    const [aqiThreshold, setThreshold] = useState(props.profile.aqiThreshold)

    const [validated, setValidated] = useState(false)
    const [autoDetectLocationError, setAutoDetectLocationError] = useState(false)
    const [submitFailed, setSubmitFailed] = useState(false)

    const latitudeOnChange = e => setLatitude(e.target.value)
    const longitudeOnChange = e => setLongitude(e.target.value)
    const thresholdOnChange = e => setThreshold(e.target.value)

    function submitEdit(e) {
        e.preventDefault()
        setValidated(true)
        const form = e.currentTarget
        if(form.checkValidity()) {
            const data = {
                profile: {
                    latitude,
                    longitude,
                    aqi_threshold: aqiThreshold
                }
            }
            fetch('/api/v1/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res =>  res.json().then(data => ({status: res.status, body: data})))
            .then(res => {
                if(res.status === 200) {
                    props.submitEditCB()
                } else {
                    setSubmitFailed(true)
                }
            })
            .catch(() => setSubmitFailed(true))
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
        <Modal show='true' centered>
            <Modal.Header>
                <Modal.Title>Update Profile</Modal.Title>
                <CloseButton onClick={props.cancelEditCB} />
            </Modal.Header>
            <Modal.Body>
                <Form validated={validated} onSubmit={submitEdit} noValidate>
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
                    <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                    {submitFailed ? 
                        <div className="text-danger mt-3">Failed to save updated profile to server</div>
                    : ''}
                </Form>
            </Modal.Body>
        </Modal>
    )
}