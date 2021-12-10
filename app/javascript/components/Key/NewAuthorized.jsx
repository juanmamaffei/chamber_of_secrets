import React, { useState } from 'react'
import { Accordion, Form } from 'react-bootstrap'
import axios from 'axios'

const NewAuthorized = () => {

  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    event.preventDefault();

    
    console.log(event.target.value);
  }
  return (<Accordion>
    <Accordion.Item>
      <Form.Control type="email" placeholder="Enter user's email" onChange={ handleChange } />
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
 )}

export default NewAuthorized