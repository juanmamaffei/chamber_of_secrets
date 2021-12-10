import React, { useState } from 'react'
import { Accordion, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const NewAuthorized = () => {

  const [query, setQuery] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();

    axios.post('/api/v1/query',
      {
        "user": {
            "query": event.target.value
        }
    })
      .then(
        r => {setQuery(r.data.users)}
      )
      .catch(r=>console.log(r))
  }
  
  const handleSelect = (data) => {
    //setSelected(...selected, data.id);
    // In data, we have an array... 0 is ID, 1 is EMAIL
    setSelected([...selected,{id:data[0].id,email:data[0].email}]);
    
  }

  return (<Accordion>
    <Accordion.Item>
      <Form.Control type="email" placeholder="Enter user's email" onChange={ handleChange } 
          autoComplete='false'
          />
      <Form.Text className="text-muted">Find here the people with whom you want to share your key.</Form.Text>
      {query.map((e,i) => (
        <div key={ i } className="mb-3">
            <Button variant="link" onClick={ () => handleSelect([e]) } id={ e.id }>{ e.email }</Button>
        </div>
    ))}
      <Accordion>
          <Accordion.Item>
              <Accordion.Header>Shared with...</Accordion.Header>
              <Accordion.Body>
                  { selected.map((e,i) => ( <i key={ i }>{e.email} | {e.id}</i>)) 
                     }
                  {
                    selected.length>0 ? <Button variant="link" onClick= { ()=> { setSelected([]) } }>Reset</Button> : ""
                  }
              </Accordion.Body>
          </Accordion.Item>
      </Accordion>
  </Accordion.Item>
</Accordion>
 )}

export default NewAuthorized