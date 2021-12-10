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
    
    const [edit, setEdit] = useState(false);
    const [elementForEdit, setElementForEdit] = useState({id: 0, title: "", description: "", expiration: "", authorized_users: []});


    //actions for bootstrap modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleNew = () => {
        setElementForEdit({})
        setEdit(false)
        setShow(true);
    };
    const handleEdit = (e) => {
        setEdit(true);
        setShow(true);
    }
    let navigate = useNavigate()

    const destroySession = () => (
        axios.delete('/api/v1/logout').then(response =>
            navigate('/')
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
    },[authorizedKeys.length + ownKeys.length + 1])
    
    
    if(loggedIn){
        const ownKeysList = ownKeys.map((element, index) => 
            {
                return element ? <li key={ index }>Title: { element.title }, Key: { element.description } | Other { element.authorized_users.length } authorized.| ID: { element.id }
                <Button variant="secondary" onClick={ ()=> { setElementForEdit(element); handleEdit(element)} }>Edit</Button> | 
                <Button variant="secondary" onClick={ handleNew }>Delete</Button>
                
                 </li> : ""
            })
    
        const authorizedKeysList = authorizedKeys.map((element, index) => {
            return element ? <li key={ index }>Title: { element.title }, Key: { element.description } | Other { element.authorized_users.length } authorized.</li> : ""
            
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
                    { ownKeysList }
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
                <Button variant="primary" onClick={ handleNew }>New password</Button>
                <NewKey show={ show }
                    // handleShow={ handleShow }
                    handleClose={ handleClose }
                    setOwnKeys={ setOwnKeys }
                    ownKeys={ ownKeys } 
                    edit={ edit }
                    element={ elementForEdit }
                    />
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