import React, { useState, useEffect, Fragment } from 'react'
import { Form, Button, Container, Card,Row, Col, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../Logo'

const Wrapper = styled.div`
    background-color: #7c3aed;
    padding-top: 25vh;
    height: 100vh
`
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
        <div className="d-grid gap-2">

        <Button variant="outline-secondary" size="lg" type="submit">
            Enter
        </Button>

        </div>
    </Form>
)

const Messages = (props) => {
    return(
        <Alert variant={ props.variant }>{ props.message }</Alert>
    )
}

function Login (props) {
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [alerts, setAlerts] = useState({ variant: "", message: "", show: false })
    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const [loggedIn, setLoggedIn] = useState(false)
    
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
                setAlerts({ variant: "danger", message: response.response.data.message, show: true })
            })

    }
    
    useEffect(()=>{        
        axios.get("/api/v1/logged_in")
            .then(r=> { setLoggedIn(Boolean(r.data.logged_in));
            })
            .catch(r=> {console.log(r); setLoggedIn(r)})
        
    },[])
   
    return (
        <Wrapper>
            <Container>
            {alerts.show && <Row><Messages variant={alerts.variant} message={alerts.message} /></Row>}
            <Card>
                
                <Card.Body>
                <Card.Title className="text-center">
                <Logo color="#6c757d"/>
                </Card.Title>
                <Row><h2>Login</h2></Row>
                    <Col>
                        {loggedIn? navigate("/web/dashboard") : <LoginForm handleChange={ handleChange }
                            handleSubmit={handleSubmit}
                            loggedIn={loggedIn}/>}
                    </Col>
                    <Row style={{margin: "10px 3px", textAlign: "center"}}>
                        <hr />
                        <span>You don't have an account? <Link to={"/web/signup"}>Sign up.</Link></span>
                    </Row>
                </Card.Body>
            </Card>
            </Container>
        </Wrapper>
    )
}

export default Login