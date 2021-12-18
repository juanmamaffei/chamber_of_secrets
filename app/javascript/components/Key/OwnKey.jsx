import React, { useState } from 'react'
import { Button, Card, Row, Col, Tooltip, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash, faCalendar, faEye, faEyeSlash, faCopy, faKey, faUsers } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'

const PassWrapper = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: stetch;
    align-items: baseline;

    padding: 3px;
    margin-left: 0px;
    padding-bottom: 8px;
    `
const PassField = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    box-shadow: 5px #e7e5e4;
    flex-grow: 100;
    background-color: #f3f4f6;
    border: 1px solid #f3f4f6;
    border-radius: 3px;
    padding: 5px 5px 5px 5px;
    button{
        text-align: right;
    }
`

const SuperCard = styled.div`
    background-color: white;
    border-radius: 15px;
    //min-height: 250px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-family: sans-serif;

    .superCardTitle{
        margin: 10px 5px 5px 5px;
        font-size: 1.2em;
        font-weight: 500;
    }
    .shaExpWrapper{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 10px 12px;
        
        .subtitle{
            font-size: small;
        }
        .shared{
            width: 50%;
        }
        .littlebig{
            font-size: 1.4em;
        }
    }
    .buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: stretch;
        margin: 15px 0;
    }
`

const OwnKey = (props) => {
    const [showLink, setShowLink] = useState(true)

return (
    <Col xs={ 12 } lg={ 4 } md={ 6 }>
    <SuperCard key={ props.element.id } >
        <div className="superCardTitle">
        { props.element.title }
        </div>
        <PassWrapper>
            
            <PassField>
                { showLink? "*************" : props.element.description }
                <Button variant="outline-link" 
                    onClick={()=> { setShowLink((showLink? false : true))}}>
                    { showLink ? <FontAwesomeIcon icon={ faEye } /> : <FontAwesomeIcon icon={ faEyeSlash } /> }
                </Button>
            </PassField>
            <div>
            <Button variant="link" onClick={() => { navigator.clipboard.writeText(props.element.description) }}>
              <FontAwesomeIcon icon={ faCopy } /></Button>
            </div>
        </PassWrapper>
        <div className="shaExpWrapper">
            <div className="shared">
                <div className="subtitle">SHARED WITH</div>
                <FontAwesomeIcon icon={ faUsers } color="#57534e" size="lg"/>
                <span className="littlebig"> { props.element.authorized_users.length } </span>
            </div>
            <div className="expiration">
                <div className="subtitle">EXPIRES</div>
                <FontAwesomeIcon icon={ faCalendar } color="#57534e" size="lg"/>
                <span className="littlebig"> { props.element.expiration? `${ new Date(props.element.expiration).toLocaleDateString() }.` : "Never." } </span>
            </div>
        </div>
        <div className="buttons">
            <div>
                <Button variant="outline-primary" onClick={ () => { props.setElementForEdit(props.element); props.handleEdit(props.element)}} > <FontAwesomeIcon icon={faPenSquare} /> Edit</Button></div>
            <div>
                <Button variant="outline-danger" onClick={ () => props.handleDelete(props.element.id) }
                ><FontAwesomeIcon icon={ faTrash } /> Delete</Button>
            </div>

        </div>
    </SuperCard>
    
  </Col>
    )
}

export default OwnKey
