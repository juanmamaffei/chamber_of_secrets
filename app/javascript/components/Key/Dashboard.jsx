import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import isLoggedIn from '../Session/CheckLogin'
import NewKey from './NewKey'

const Dashboard = ()=>{
    const [ownKeys, setOwnKeys] = useState([]);
    const [authorizedKeys, setAuthorizedKeys] = useState([]);
    const loggedIn = isLoggedIn()


    //actions for bootstrap modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let navigate = useNavigate()

    const destroySession = () => (
        axios.delete('/api/v1/logout').then(response =>
            navigate('/')
        ).catch(response =>
            console.log(response)
        ))
    useEffect(()=>{
        console.log(ownKeys);
        
        // Get the keys and store them in the state
        axios.get('/api/v1/dashboard')
            .then(response => {
                setOwnKeys(response.data.own_keys);
                setAuthorizedKeys(response.data.authorized_keys);
            })
            .catch(response => console.log(response))
    },[authorizedKeys.length + ownKeys.length + 1])
    
    
    if(loggedIn){
        const ownKeysList = ownKeys.map((element, index) => 
            {
                return element ? <li key={ index }>Title: { element.title }, Key: { element.description } | Other { element.authorized_users.length } authorized.</li> : <li>Null </li>
            })
    
        const authorizedKeysList = authorizedKeys.map((element, index) => {
            return element ? <li key={ index }>Title: { element.title }, Key: { element.description } | Other { element.authorized_users.length } authorized.</li> : <li>Null </li>
            
        })
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
                <Button variant="primary" onClick={ handleShow }>New password</Button>
                <NewKey show={ show }
                    handleShow={ handleShow }
                    handleClose={ handleClose }
                    setOwnKeys={ setOwnKeys }
                    ownKeys={ ownKeys } />
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