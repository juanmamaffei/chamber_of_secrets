import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Dashboard = ()=>{
    const [loggedIn, setLoggedIn] = useState(false);
    const [ownKeys, setOwnKeys] = useState([]);
    const [authorizedKeys, setAuthorizedKeys] = useState([]);

    const destroySession = () => (
        axios.delete('/api/v1/logout').then(response =>
            setLoggedIn(false)
        ).catch(response =>
            console.log(response)
        ))
    useEffect(()=>{
        
        // Get the keys and store them in the state
        axios.get('/api/v1/dashboard')
            .then(response => {
                setOwnKeys(response.data.own_keys);
                setAuthorizedKeys(response.data.authorized_keys);
            })
            .catch(response => console.log(response))
    
        // Check if user is logged in
        axios.get("/api/v1/logged_in")
            .then(r=> setLoggedIn(Boolean(r.data.logged_in)))
            .catch(r=> console.log(r))
    
    },[authorizedKeys.length+ownKeys.length])
    
    
    if(loggedIn){
        const ownKeysList = ownKeys.map((element, index) => 
            {
                return element ? <li key={ index }>Title: { element.title }, Key: { element.description } | Other { element.authorized_users.length } authorized.</li> : <li>Null </li>
            })
    
        const authorizedKeysList = authorizedKeys.map((element, index) => {
            return element ? <li key={ index }>Title: { element.title }, Key: { element.description } | Other { element.authorized_users.length } authorized.</li> : <li>Null </li>
            
        })
        console.log(authorizedKeysList)
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
                <ul>
                    { ownKeysList
                    }
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <h2>Shared passwords</h2>
                <ul>
                    { authorizedKeysList }
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <button>New password</button>
            </Col>
        </Row>

        </Container>
        )}else
    {
        return( 
        <Container>
            <Row>
                <Link to='/web/login'>You need login</Link>
            </Row>
        </Container>
         )
    }
}
export default Dashboard