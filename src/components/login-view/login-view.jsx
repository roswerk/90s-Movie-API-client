import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./login-view.scss";
import Form from  "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

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
        <Form.Control type="text" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      </Col>
      <Col>
      <Button variant="danger" type="submit" onClick={handleSubmit}>Submit</Button>
      </Col>
    </Form>
    </Row>
    
  );
};

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  }