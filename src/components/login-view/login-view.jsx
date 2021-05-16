import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./login-view.scss";
import Form from  "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {Link} from "react-router-dom";


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a request to the server for authentication 
    try {
    const {data} = await axios.post("https://api90smovies.herokuapp.com/login", {
    userName: username,
    password: password
    });
    
    props.onLoggedIn(data);
    window.open("/", "_self");
    } catch (error) {
    console.log(error)
    }}

  return (
    <Row className="justify-content-sm-center login-view">

    <Form>
    <Col>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)}/>
      </Form.Group>
      </Col>
      <Col>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      </Col>
      <Col className="logginButton">
      <Button variant="danger" type="submit" onClick={handleSubmit}>Submit</Button>
      </Col>
      <Col className="logginButton">
      <Link to={"/register"}>
      <Button variant="light link" className="mt-5">Register</Button>
      </Link>
      </Col>
    </Form>
    </Row>
    
  );
};

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  }

  