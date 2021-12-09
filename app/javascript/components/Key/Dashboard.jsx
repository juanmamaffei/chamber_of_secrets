import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import axios from 'axios'


const Dashboard = ()=>{
    const [loggedIn, setLoggedIn] = useState(false);
    const destroySession = () => (
        axios.delete('/api/v1/logout').then(response =>
            console.log(response)
        ).catch(response =>
            console.log(response)
        ))
    // Check if user is logged in
    axios.get("/api/v1/logged_in")
        .then(r=> setLoggedIn(Boolean(r.data.logged_in)))
        .catch(r=> console.log(r))
    
        
        return(
    <Container>
        <Row>
            <Col>Logo</Col>
            <Col>Session menu
                { loggedIn &&
                <button onClick={ destroySession }>Logout</button> }
            </Col>
        </Row>
        <Row>
            <Col>
                <h2>Own passwords</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <h2>Shared passwords</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <button>New password</button>
            </Col>
        </Row>

    </Container>
    )}

export default Dashboard