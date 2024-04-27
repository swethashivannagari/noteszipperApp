import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import "./Landing.css"

const Landing = () => {
   
const navigate=useNavigate();
    useEffect(() => {
        const userInfo=localStorage.getItem("userInfo");
        if (userInfo) {
          navigate('/mynotes'); // Redirect to the notes page
        }
      }, [navigate]);
    
  return (
    <div className='main'>
        <Container>
            <Row>
        <div className='intro-text'>
            <div>
                <h1 className='title'>Welcome to note Zipper</h1>
                <p className='subtitle'>One safe place for all your notes</p>
            </div>
            <div className='buttonContainer'>
                <a href="/login">
                    <Button size='lg' className='landingbutton'>Login</Button>
                </a>
                <a href="/register">
                    <Button size='lg' className='landingbutton' variant="outline-primary">Register</Button>
                </a>
            </div>
        </div>
            </Row>
        </Container>
    </div>
  )
}

export default Landing