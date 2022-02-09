import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Button, Alert, Navbar, Nav, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import NewKey from './NewKey'
import OwnKey from './OwnKey'
import SharedKey from './SharedKey'
import Logo from '../Logo'
import styled from 'styled-components'
import DeleteConfirmationModal from './DeleteConfirmationModal'

const SuperBody = styled.div`
    background-color: #f3f4f6;
    min-height: 100vh;
`


const Dashboard = ()=>{
    const [ownKeys, setOwnKeys] = useState([]);
    const [authorizedKeys, setAuthorizedKeys] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    
    const [edit, setEdit] = useState(false);
    const [elementForEdit, setElementForEdit] = useState({id: 0, title: "", description: "", expiration: "", authorized_users: []});

    const [alerts, setAlerts] = useState({ variant: "", message: "", show: false })
    
    const Messages = (p) => {
        return(
            <Alert variant={ p.variant || "warning" }>{ p.message || "Done" }</Alert>
        )
    }
    const hideAlerts = (time) => {
        setInterval(() => {
            setAlerts({ variant: "", message: "", show: false })
        }, time);
    }
    
    //actions for bootstrap modals
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
    const [showDelModal, setShowDelModal] = useState(false);
    const [idForDelete, setIdForDelete] = useState(0)
    const handleDeleteConfirmation = (props) => {
        setIdForDelete(props);
        setShowDelModal(true);
    }
    const handleDelete = (e) => {
        axios.delete(`/api/v1/keys/${e}`)
            .then(
                r => {
                    setAlerts({variant: "warning", message: r.data.message, show: true});
                    hideAlerts(5000);
                    setOwnKeys(ownKeys.filter(item=>item.id !== e));
                }
            )
            .catch(r=>console.log(r));
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
                    setLoggedIn(true);
                    setOwnKeys(response.data.own_keys);
                    setAuthorizedKeys(response.data.authorized_keys);
                
            })
            .catch(response => { 
                if (response.status == 401) { setLoggedIn(false)}})
    },[])
    
    
    if(loggedIn){
        const ownKeysList = ownKeys.map((element, index) => 
            {
                return element ? <OwnKey element={ element } key={ index }
                setElementForEdit={setElementForEdit} handleEdit={handleEdit} handleDelete={handleDeleteConfirmation}

                /> : ""
            })
    
        const authorizedKeysList = authorizedKeys.map((element, index) => {
            return element ? <SharedKey element={ element } key={ index } /> : ""
            
        })


        return(
            <SuperBody>
            <Navbar expand="lg" bg="light">
                <Container>
                <Navbar.Brand>
                    <Logo color="#7c3aed"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {loggedIn && <Nav.Link onClick={ destroySession }>Logout</Nav.Link>}
                    {loggedIn && <Nav.Link onClick={ handleNew }>New password</Nav.Link>}
                    
                </Nav>
                </Navbar.Collapse>
                
                </Container>
            </Navbar>
            <Container>
                {alerts.show && <Row><Messages variant={alerts.variant} message={alerts.message} /></Row>}
                <Row>
            <Col className="d-grid gap-2">
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
        <Row>
                <h3>My passwords</h3>
                { ownKeysList }
        </Row>
        <Row>
                <h3>Shared passwords</h3>
                    { authorizedKeysList }
        </Row>
        <Row>
            <DeleteConfirmationModal
                setShowDelModal={setShowDelModal}
                handleDelete={handleDelete}
                showDelModal={showDelModal}
                idForDelete={idForDelete}
                setIdForDelete={setIdForDelete}
            />
        </Row>
        

        </Container>
        </SuperBody>
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