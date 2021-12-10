import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Accordion } from 'react-bootstrap'
import axios from 'axios'

const NewKeyForm = (props) => {
    let element= {}
    if(props.element){
        element = props.element
    } else {
        element = {title: '', description: '', expiration: ''}
    }
    return (
      <Form onSubmit={ props.handleSubmit }>
        <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title of key" onChange={ props.handleChange } name='title' defaultValue={ element.title } />
            <Form.Text className="text-muted">For example: Wifi key of Office 2.</Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={ props.handleChange } name='description' defaultValue={ element.description } />
        </Form.Group>
        <Form.Group>
            <Form.Label>Share pass with...</Form.Label>

            <Accordion>
                <Accordion.Item>
                    <Form.Control type="email" placeholder="Enter user's email" />
                    <Form.Text className="text-muted">Find here the people with whom you want to share your key.</Form.Text>
                    {['a@b.com','a@b.com','a@b.com','a@b.com'].map((e,i) => (
                        <div key={`1${i}`} className="mb-3">
                        <Form.Check 
                            type='checkbox'
                            id={`2${i}`}
                            label={`3${i}`}
                        />
                        </div>
                    ))}
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>Shared with...</Accordion.Header>
                            <Accordion.Body>
                                email 1, email 2, email 3
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Item>
            </Accordion>
        </Form.Group>
        <Form.Group>
            <Form.Label>Expiration</Form.Label>
            <Form.Control name="expiration" type="date" defaultValue={ element.expiration } placeholder="Your pass expires..." onChange={ props.handleChange } ></Form.Control>
        </Form.Group>
        <Form.Group>
            <Button type="submit">Create</Button>
        </Form.Group>
    </Form>
    )}

const NewKey = (props) => {
    // Fields: title, description, expiration
    const [fields, setFields] = useState({title: "", description: "", expiration: ""});
    // Array for authorized users
    const [authorized, setAuthorized] = useState([]);

    const handleChange = (event) => {
        event.preventDefault();

        setFields(Object.assign({},fields,{[event.target.name]:event.target.value}));
        
        // console.log(fields)
    }
    useEffect(()=>{
        
    },[1])
    const handleSubmit = (event) => {
        event.preventDefault();

        if(props.edit){
            axios.patch(`/api/v1/keys/${props.element.id}`, {
                id: props.element.id,
                title: fields.title,
                description: fields.description,
                expiration: fields.expiration,
                authorized_users: "[]"
            })
                .then(
                    r=> {
                        props.setOwnKeys([...props.ownKeys, r.data.key]);
                        // console.log(r); console.log("OK")
                    }
                )
                .catch(
                    r=> { console.log(r); console.log("NOT OK")}

                )
        }else{
            axios.post('/api/v1/keys', {
                title: fields.title,
                description: fields.description,
                expiration: fields.expiration,
                authorized_users: "[]"
            })
                .then(
                    r=> {
                        props.setOwnKeys([...props.ownKeys, r.data.key]);
                        // console.log(r); console.log("OK")
                    }
                )
                .catch(
                    r=> { console.log(r); console.log("NOT OK")}

                )
            }
        // Close modal
        props.handleClose();
    }
    return (
        <Modal show={props.show} onHide={props.handleClose} fullscreen={ true }>
        <Modal.Header closeButton>
          <Modal.Title>{ props.edit? 'Edit': 'Create new' } password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <NewKeyForm
            handleChange={ handleChange }
            handleSubmit= { handleSubmit }
            element={ props.element }
            id={ props.element.id } /> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default NewKey