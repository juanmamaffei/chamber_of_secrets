import React, { useState } from 'react'
import { Button, Card, Row, Col, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash, faCalendar, faEye, faEyeSlash, faCopy, faKey } from '@fortawesome/free-solid-svg-icons'

const OwnKey = (props) => {
    const [showLink, setShowLink] = useState(true)

return (
    <Card className="my-2" key={ props.element.id } border="dark">
    <Card.Header><FontAwesomeIcon icon={ faKey} /> { props.element.title }</Card.Header>
    <Card.Body>
      <Card.Title>
          { showLink? "**********" : props.element.description }
          <Button variant="light" onClick={()=> { setShowLink((showLink? false : true))}}>{ showLink? <FontAwesomeIcon icon={ faEye } /> : <FontAwesomeIcon icon={ faEyeSlash } /> }</Button>
          <Button variant="light" onClick={() => { navigator.clipboard.writeText(props.element.description) }}>
              <FontAwesomeIcon icon={ faCopy } />
          </Button>
          </Card.Title>
      <Card.Text>
        You shared this pass with { props.element.authorized_users.length } other users.

        { props.element.expiration? `This key expires on ${ props.element.expiration }.` : "This key doesn't expire." }

        
      </Card.Text>
    </Card.Body>
    <Card.Footer>
        <Row>
            <Col>
                <span className="px-1">
                    <Button variant="secondary" size="sm" onClick={ () => { props.setElementForEdit(props.element); props.handleEdit(props.element)} }><FontAwesomeIcon icon={faPenSquare} /></Button>
                </span>
                <span className="px-1">
                    <Button variant="danger" size="sm" onClick={ () => props.handleDelete(props.element.id) }><FontAwesomeIcon icon={faTrash} /></Button>
                </span>
            </Col>
            <Col>
                <FontAwesomeIcon icon={ faCalendar } /> { new Date(props.element.created_at).toLocaleDateString() }
            </Col>
        </Row>
    </Card.Footer>
  </Card>
    )
}

export default OwnKey