import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import SignInForm from './SignInForm'
import RegisterForm from './RegisterForm'

export default function SignInPage(props) {
    return (
        <Modal show='true' centered>
            <Modal.Header>
                Welcome to air quality app
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="sign-in" fill>
                    <Tab eventKey="sign-in" title="Login">
                        <SignInForm signInCB={props.signInCB} />
                    </Tab>
                    <Tab eventKey="register" title="Create Account">
                        <RegisterForm signInCB={props.signInCB} />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )
}