import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./registration-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Form } from 'react-bootstrap';
import axios from "axios";
import {Link} from "react-router-dom";


export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthDate, setBirthDate ] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Send a request to the server for authentication 
    try {
      const {data} = await axios.post('https://api90smovies.herokuapp.com/users/add', {
      userName: username,
      password: password,
      email: email,
      birthDate: birthDate
    });
      props.onRegistring(data)
  }catch(error) {
    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      console.log('error registering the user')
    }};

  return (
    <Row className = "justify-content-md-center register-view">
    <Form>
      <Col>
      <Form.Group as={Row}>
      <Form.Label>
        Username:
        </Form.Label>
        
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        

      </Form.Group>
      </Col>

      <Col>
      <Form.Group as={Row}>
      <Form.Label>
        Password:
        </Form.Label>
        
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        
      </Form.Group>
      </Col>

      <Col>
      <Form.Group as={Row}>
      <Form.Label>
        Email:
      </Form.Label>
        
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
        
      </Form.Group>
      </Col>

      <Col>
      <Form.Group as={Row}>
      <Form.Label>
        Date of Birth:
        </Form.Label>
        
        <Form.Control type="text" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        
      </Form.Group>
      </Col>
      <Col className="registrationButton">
      <Button type="submit" onClick={handleRegister} variant="danger">Submit</Button>
      </Col>
      
      <Col className="registrationButton">
      <Link to={"/"}>
      <Button variant="light link" className="mt-5">Log In</Button>
      </Link>
      </Col>
      
    </Form>
    </Row>
  );
};

RegistrationView.propTypes = {
username: PropTypes.string,
password: PropTypes.string,
email: PropTypes.string,
birthDate: PropTypes.string
}