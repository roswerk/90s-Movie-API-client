import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./registration-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Form } from 'react-bootstrap';
import axios from "axios";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container"

export function RegistrationView(props) {
const [ username, setUsername ] = useState('');
const [ password, setPassword ] = useState('');
const [ email, setEmail ] = useState('');
const [ birthDate, setBirthDate ] = useState('');

const handleRegister = async (e) => {
e.preventDefault();
try {
const {data} = await axios.post('https://api90smovies.herokuapp.com/users/add', {
userName: username,
password: password,
email: email,
birthDate: birthDate
});
props.onRegistring(data)
}catch(error) {
window.open('/', '_self');
console.log('error registering the user')
}};

return (
  <Container>
  <div className="justify-content-md-center register-view">
  <h2>Create a free account</h2>
  </div>
  <br />
  <Form className="registration-form">
    <Form.Group controlId="formBasicUsername">
      <Form.Label>Pick a Username: </Form.Label>
      <Form.Control 
        className="form-field"
        type="text" 
        placeholder="Username" 
        required
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <Form.Text 
        className="text-muted"
        >Must be alphanumeric and contain at least 5 characters
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Choose a Password: </Form.Label>
      <Form.Control 
        className="form-field"
        type="text" 
        placeholder="Password" 
        required
        value-={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Form.Text 
        className="text-muted"
      >Password is required.
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicEmail">
      <Form.Label>Enter Email Address: </Form.Label>
      <Form.Control 
        className="form-field"
        type="text" 
        placeholder="example@gmail.com" 
        required
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Form.Text 
        className="text-muted"
      >Must be a valid email address.
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicBirthday">
      <Form.Label>Enter Date of Birth:</Form.Label>
      <Form.Control 
        className="form-field"
        type="date" 
        placeholder="MM/DD/YYYY" 
        required
        value={birthDate} 
        onChange={(e) => setBirthDate(e.target.value)} 
      />
    </Form.Group>

    <Button type="submit" 
            variant="danger" 
            onClick={handleRegister}>
      Create Account
    </Button>

    <Link to={`/`}>
      <Button 
        variant="light ml-3">
        I already have an account</Button>
    </Link>

  </Form>
</Container>



// <Row className="justify-content-md-center register-view">
//   <Form>
//     <Col>
//     <Form.Group as={Row}>
//       <Form.Label>
//         Username:
//       </Form.Label>
//       <Form.Control type="text" value={username} onChange={e=> setUsername(e.target.value)} />
//     </Form.Group>
//     </Col>
//     <Col>
//     <Form.Group as={Row}>
//       <Form.Label>
//         Password:
//       </Form.Label>
//       <Form.Control type="password" value={password} onChange={e=> setPassword(e.target.value)} />
//     </Form.Group>
//     </Col>
//     <Col>
//     <Form.Group as={Row}>
//       <Form.Label>
//         Email:
//       </Form.Label>
//       <Form.Control type="text" value={email} onChange={e=> setEmail(e.target.value)} />
//     </Form.Group>
//     </Col>
//     <Col>
//     <Form.Group as={Row}>
//       <Form.Label>
//         Date of Birth:
//       </Form.Label>
//       <Form.Control type="text" value={birthDate} onChange={e=> setBirthDate(e.target.value)} />
//     </Form.Group>
//     </Col>
//     <Col className="registrationButton">
//     <Button type="submit" onClick={handleRegister} variant="danger">Submit</Button>
//     </Col>

//     <Col className="registrationButton">
//     <Link to={"/"}> <Button variant="light link" className="mt-5">Log In</Button>
//     </Link>
//     </Col>

//   </Form>
// </Row>
);
};

RegistrationView.propTypes = {
username: PropTypes.string,
password: PropTypes.string,
email: PropTypes.string,
birthDate: PropTypes.string
}