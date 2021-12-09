import React, { useState, useEffect, Fragment } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, Redirect } from 'react-router-dom'


const LoginForm = (props) => (
    <Form onSubmit={ props.handleSubmit }>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={ props.handleChange } />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={ props.handleChange }
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Enter
        </Button>
    </Form>
)

const Messages = (props) => {
    return(
        <Alert variant={ props.variant }>{ props.message }</Alert>
    )
}

const Login = (props) => {
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [alerts, setAlerts] = useState({ variant: "", message: "", show: false })
    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {

        event.preventDefault()
        const csrf = document.querySelector("[name=csrf-token]").content
        axios.defaults.headers.common["CSRF-TOKEN"] = csrf

        axios.post("/api/v1/sessions",
            {
                "user": {
                    "email": credentials.email,
                    "password": credentials.password
                }
            }).then((response) => {
                if (response.data.logged_in) {
                    navigate("/web/dashboard")
                    //return(<Redirect to='/web/dashboard' />)
                } else {
                    console.log(response)
                    setAlerts({ variant: "warning", message: response.data.message, show: true })

                }
            }).catch(response => {
                setAlerts({ variant: "danger", message: response, show: true })
            })

    }
    return (
        <Container>
            {alerts.show && <Row><Messages variant={alerts.variant} message={alerts.message} /></Row>}
            <Row>
                <h2>Login</h2>
            </Row>
            <Row>
                <Col><LoginForm handleChange={handleChange} handleSubmit={handleSubmit} /></Col>
            </Row>
        </Container>
    )
}

export default Login