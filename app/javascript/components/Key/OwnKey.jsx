import React, { useState } from 'react'
import { Button, Card, Row, Col, Tooltip, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash, faCalendar, faEye, faEyeSlash, faCopy, faKey } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'

const PassWrapper = styled.span`
    padding: 3px 10px;
    margin-left: 5px;
    padding-bottom: 8px;
`
const PassField = styled.span`
    box-shadow: 5px #e7e5e4;
    background-color: #f3f4f6;
    border: 1px solid #f3f4f6;
    border-radius: 3px;
    padding: 5px 5px 5px 5px;
    button{
        text-align: right;
    }
`
const OwnKey = (props) => {
    const [showLink, setShowLink] = useState(true)

return (
    <Col xs={ 12 } lg={ 4 } md={ 6 }>
    <Card className="my-2" key={ props.element.id } >
    <Card.Header className="justify-content-center"><FontAwesomeIcon icon={ faKey} /> { props.element.title }</Card.Header>
    <Card.Body>
        <Card.Title className="text-center">
            <PassField>
            <PassWrapper>
                { showLink? "*************" : props.element.description }

            </PassWrapper>
            <Button variant="outline-link" onClick={()=> { setShowLink((showLink? false : true))}}>{ showLink? <FontAwesomeIcon icon={ faEye } /> : <FontAwesomeIcon icon={ faEyeSlash } /> }</Button>
            </PassField>
          <Button variant="outline-link" onClick={() => { navigator.clipboard.writeText(props.element.description) }}>
              <FontAwesomeIcon icon={ faCopy } />
          </Button>
        </Card.Title>
      <Card.Text>
        You shared this pass with { props.element.authorized_users.length } other users.
    </Card.Text>
        <Card.Text>
        <strong>
        { props.element.expiration? `This key expires on ${ new Date(props.element.expiration).toLocaleDateString() }.` : "This key doesn't expire." }
        </strong>
        
      </Card.Text>
    </Card.Body>
    <Card.Footer>
        <Row>
            <Col>
                <span className="px-1">
                    <Button variant="secondary" size="sm" onClick={ () => { props.setElementForEdit(props.element); props.handleEdit(props.element)} }><FontAwesomeIcon icon={faPenSquare} /></Button>
                </span>
                <span className="px-1">
                    <Button variant="danger" size="sm" onClick={ () => props.handleDelete(props.element.id) }><FontAwesomeIcon icon={ faTrash } /></Button>
                </span>
            </Col>
            <Col>
                <FontAwesomeIcon icon={ faCalendar } /> <strong>Created at: </strong>{ new Date(props.element.created_at).toLocaleDateString() }
            </Col>
        </Row>
    </Card.Footer>
  </Card>
  </Col>
    )
}

export default OwnKey
