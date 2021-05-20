import React, {useState} from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";


export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});



  const handleRegister = async (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      try {
        const {
          data
        } = await axios.post("https://api90smovies.herokuapp.com/users/add", {
          userName: username,
          password: password,
          email: email,
          birthDate: birthDate
        });
        props.onRegistring(data)
        window.open("/", "_self");
      } catch (error) {
        window.open("/", "_self");
        console.log("error registering the user")
      }
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordError.passwordMissing = "Password is required";
      isValid = false;
    }

    if (password.trim().length < 6) {
      passwordError.passwordMissing = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailError.notEmail = "Enter a valid email address";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };


  return (
    <Form className="log-reg-view">
      <div className="justify-content-md-center register-view">
        <h2>Create a free account</h2>
      </div>

      <Form.Group controlId="registerUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter a username of your choice" onChange={ e=>
          setUsername(e.target.value)} />
          <Form.Text className="text-muted">*required</Form.Text>
      </Form.Group>

      {Object.keys(usernameError).map((key) => {
      return (
      <div id="alertText" key={key}>{usernameError[key]}</div>
      );
      })}

      <Form.Group controlId="registerPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter a password of your choice" onChange={e=>
          setPassword(e.target.value)} />
          <Form.Text className="text-muted">*required</Form.Text>
      </Form.Group>

      {Object.keys(passwordError).map((key) => {
      return (
      <div id="alertText" key={key}>{passwordError[key]}</div>
      );
      })}

      <Form.Group controlId="registerEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control type="email" placeholder="Enter valid email please" onChange={e=> setEmail(e.target.value)} />
          <Form.Text className="text-muted">*required</Form.Text>
      </Form.Group>

      {Object.keys(emailError).map((key) => {
      return (
      <div id="alertText" key={key}>{emailError[key]} </div>
      );
      })}

      <Form.Group controlId="registerBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" placeholder="Date of Birth" onChange={e=> setBirthDate(e.target.value)} />
      </Form.Group>

      <Button variant="danger" type="submit" onClick={handleRegister}><span
          className="text-color">Register</span></Button>
      <Link to={`/`}> <Button variant="light" type="submit"><span className="text-color">I already have an
        Account</span></Button>
      </Link>
    </Form>
    
  );
}

RegistrationView.propTypes ={
  register: PropTypes.shape ({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
    }),
  onRegister: PropTypes.func,
};