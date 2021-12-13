import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import isLoggedIn from '../Session/CheckLogin'
import NewKey from './NewKey'
import OwnKey from './OwnKey'
import SharedKey from './SharedKey'

const Dashboard = ()=>{
    const [ownKeys, setOwnKeys] = useState([]);
    const [authorizedKeys, setAuthorizedKeys] = useState([]);
    const loggedIn = isLoggedIn()
    
    const [edit, setEdit] = useState(false);
    const [elementForEdit, setElementForEdit] = useState({id: 0, title: "", description: "", expiration: "", authorized_users: []});

    const [alerts, setAlerts] = useState({ variant: "", message: "", show: false })
    
    const Messages = (p) => {
        return(
            <Alert variant={ p.variant || "warning" }>{ p.message || "Done" }</Alert>
        )
    }

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
    const handleDelete = (e) => {
        // console.log(e)
        axios.delete(`/api/v1/keys/${e}`)
            .then(
                r => {
                    setAlerts({variant: "warning", message: r.data.message, show: true});
                    
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
                setOwnKeys(response.data.own_keys);
                setAuthorizedKeys(response.data.authorized_keys);
            })
            .catch(response => console.log(response))
    },[])
    
    
    if(loggedIn){
        const ownKeysList = ownKeys.map((element, index) => 
            {
                return element ? <OwnKey element={ element } key={ index }
                setElementForEdit={setElementForEdit} handleEdit={handleEdit} handleDelete={handleDelete}

                /> : ""
            })
    
        const authorizedKeysList = authorizedKeys.map((element, index) => {
            return element ? <SharedKey element={ element } key={ index } /> : ""
            
        })


        return(
            <Container>
                {alerts.show && <Row><Messages variant={alerts.variant} message={alerts.message} /></Row>}
        <Row>
            <Col>Logo</Col>
            <Col>Session menu
                { loggedIn &&
                <button onClick={ destroySession }>Logout</button> }
            </Col>
        </Row>
        <Row>
                <h2>Own passwords</h2>
                { ownKeysList }
        </Row>
        <Row>
                <h2>Shared passwords</h2>
                    { authorizedKeysList }
        </Row>
        <Row>
            <Col className="text-end">
                <Button variant="success" size="lg" onClick={ handleNew }>New password</Button>
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