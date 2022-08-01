import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

export default function SignInForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [failedLogin, setFailedLogin] = useState(false)

    const usernameOnChange = e => setUsername(e.target.value)
    const passwordOnChange = e => setPassword(e.target.value)

    const login = () => {
        const data = {
            user: {
                username,
                password
            }
        }
        fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.status === 200) {
                props.signInCB()
            } else if(res.status === 401) {
                setFailedLogin(true)
            }
        })
    }

    return (
        <Form>
                {failedLogin ? 
                    <div className="text-danger">Username or password is incorrect</div>
                : ''}
            <Form.Group className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={usernameOnChange}
                />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={passwordOnChange}
                />
            </Form.Group>
            <Button variant="primary" type="button" className="mt-3" onClick={login}>Log In</Button>
        </Form>
    )
}