import React from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Index = ()=>(
    <Container>
        <Row text-center>
            <h1>Chamber of Secrets</h1>
        </Row>
        <Row>
            <Col>
                <p>With CHAMBER OF SECRETS, you can manage all yor passwords in one place.</p>
                <p>Also, you can share passwords with other people safely.</p>
                </Col>
        </Row>
        <Row>
            <Link to="/web/login">
                <Col><Button>Enter</Button></Col>
            </Link>
            
        </Row>
    </Container>
)

export default Index