import React from 'react'
import { Container, Col, Row, Button, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import ReactTypingEffect from 'react-typing-effect';
import OwnKey from './Key/OwnKey'

import styled from 'styled-components'

const Header = styled.section`
    min-height: 300px;
    padding: 100px 20vw;
    color: #fafafa;
    
`
const Curve = styled.div`
    position: absolute;
    height: 100px;
    width: 100%;
    bottom: 0;
    ::before{
        content: '';
        display: block;
        position: absolute;
        border-radius: 50%;
        width: 100%;
        height: 72%;
        background-color: #7C3AED;
        transform: translate(0,85%);
        z-index:1;
    }
`
const SafeBro = styled.section`
    min-height: 450px;
    background-color: #fafafa;
    
    padding-top: 150px;
`
const Features = styled.section`
    min-height: 300px;
    background-color: #ddd6fe;
    h2{
        padding-top: 85px;
        padding-bottom: 80px;
    }
`
const Download = styled.section`
    padding: 85px;
    min-height: 300px;
    //background-color: #6366f1;
    background-color: #fafafa;
    text-align: center;
`
const Credits = styled.section`
    min-height: 55px;
    background-color: #581c87;
    color: white;
`
const Index = ()=>(
    <div>
        
        <Row>
            <Header>
                
                <h1><FontAwesomeIcon icon={ faKey } /> Chamber of Secrets</h1>
                <h3><ReactTypingEffect
                    text={["Simple" , "Collaborative", "Safe"]}
                    eraseSpeed={200}
                    typingDelay={50}
                    />  password manager.
                </h3>
                <Curve />
            </Header>
        </Row>
        <SafeBro>
            <h2>Why is CoS safe?</h2>
            <ul>
                <li>
                    CoS is open source. <a href="https://github.com/juanmamaffei/chamber_of_secrets" target="_blank">Go to repository</a>
                </li>
                <li>
                    CoS encrypts your data. This means that if someone accesses the database, they will see random numbers and symbols. <a href="">Liar! Prove it!</a>
                </li>
                <li>
                    You can use CoS on our servers or implement it on yours. <a href="">See how</a>
                </li>
            </ul>
            <Link to="/web/login">
                    <Button variant="outline-warning" size="lg" style={{margin: "100px"}}>Create free account</Button>
                </Link>
        </SafeBro>
        <Features>
            <Row>
                <Col>
                    <h2>Also, you can share the password with other users. They could see that until its expiration date.</h2>
                </Col>
                    <OwnKey element={{id: 1, description: "HiddenPass05##", title: "Example pass", authorized_users: [1,2,3,4,5,6,7,8,9], created_at: "2021/12/13"}} />
            </Row>
        </Features>
        <Download>
            <Row>
                <h2>Do you have an account?</h2>
                <Link to="/web/login">
                    <Button variant="outline-primary" size="lg" style={{margin: "50px"}}>Login</Button>
                </Link>
            </Row>
            
        </Download>
        <Credits>
            <a href="https://www.linkedin.com/in/juanmamaffei/" target="_blank" style={{color:"white", textDecoration: "none"}}>Developed by JMM.</a>
        </Credits>
     
    </div>
)

export default Index