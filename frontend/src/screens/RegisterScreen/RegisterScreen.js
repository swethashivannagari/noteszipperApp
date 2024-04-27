import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
import Loading from '../../components/Loading';
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from '../../components/MainScreen'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const RegisterScreen = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const dispatch = useDispatch(); // Added useDispatch

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  //const [picMessage, setPicMessage] = useState(null);
 
  const userRegister=useSelector(state=>state.userRegister)||{};
  const {loading,error,userInfo}=userRegister;
 
  useEffect(()=>{
    if(userInfo){
      navigate("/mynotes");
    }
  },[navigate,userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password!==confirmpassword){
      setMessage('password do not match')
    }
    else{
      dispatch(register(email,name,password))
    }
  };
   

  return <MainScreen title='REGISTER'>
    <div className="loginContainer">
    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    {loading && <Loading/>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name"

            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)} />

        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)} />

        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmpassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password"
            value={confirmpassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)} />

        </Form.Group>

       {/* <Form.Group className="mb-3" controlId="formBasicProfilePic">
          <Form.Label>Upload profile pic</Form.Label>
          <Form.Control
            type="file"

            label="Choose Profile Picture"
            onChange={setPic}
          />
</Form.Group>*/}


        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <Row>
        <Col> Have an Account ? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </div>
  </MainScreen>
}

export default RegisterScreen