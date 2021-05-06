import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./registration-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Form } from 'react-bootstrap';


export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthDate, setBirthDate ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthDate);
    props.onRegistring(
      username && password && email && birthDate
    );
  };

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
      <Col>
      <Button type="submit" onClick={handleSubmit} variant="danger">Submit</Button>
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