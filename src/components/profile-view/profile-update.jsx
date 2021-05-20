import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Nav from "react-bootstrap/Nav";
import "./profile-view.scss";


export function ProfileUpdate(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const accessUsername = localStorage.getItem("user");
  const accessEmail = localStorage.getItem("email");

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});

  // //Delete Profile
  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`https://api90smovies.herokuapp.com/users/delete/${accessUsername}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        alert("Your account has been deleted");
        localStorage.clear();
        window.open("/", "_self");
      })
      .catch(e => {
        console.log("Error deleting your account");
      });
  };

  // Update profile
  const handleUpdate = e => {
    e.preventDefault();
    const isValid = formValidation();
    const userInfo = {
      userName: username,
      password: password,
      email: email,
      birthDate: birthday
    };
    if (isValid) {
      axios.put(`https://api90smovies.herokuapp.com/user/${accessUsername}`, {
          userName: username,
          password: password,
          email: email,
          birthDate: birthday
        })
        .then(response => {
          props.updateUser(userInfo);
          alert("Your information has been updated successfully");
          window.open("/profile", "_self");
        })
        .catch(e => {
          const errors = e.response.data.errors || [];
          let errorMessage = "";
          errors.forEach(err => {
            errorMessage += err.msg;
          });
          alert(`There was an error ${errorMessage}`);
          console.log(`Error updating the user info.`);
        });
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
<Card>
  <Card.Header>
    <Nav variant="tabs" defaultActiveKey="/update">
      <Nav.Item>
        <Nav.Link href="/profile" className="CardAchor">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/update" className="CardAchor">Edit profile</Nav.Link>
      </Nav.Item>
    </Nav>
  </Card.Header>

  <Card.Body className="editProfile">
    <Card.Title>Edit Account</Card.Title>
    <Card.Text>
      Here you can update your details or delete your account. But trust us, you wont want to delete it &#128524;
    </Card.Text>

    <ListGroup className="list-group-flush mt-4">
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder={accessUsername} onChange={e=> setUsername(e.target.value)} />
          <Form.Text>*required</Form.Text>
      </Form.Group>

      {Object.keys(usernameError).map((key) => {
      return (
      <div id="alertText" key={key}>{usernameError[key]}</div>
      );
      })}


      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter a new password" onChange={e=> setPassword(e.target.value)} />
          <Form.Text>*required</Form.Text>
      </Form.Group>

      {Object.keys(passwordError).map((key) => {
      return (
      <div id="alertText" key={key}>{passwordError[key]}</div>
      );
      })}


      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder={accessEmail} onChange={e=> setEmail(e.target.value)} />
          <Form.Text>*required</Form.Text>
      </Form.Group>

      {Object.keys(emailError).map((key) => {
      return (
      <div id="alertText" key={key}>{emailError[key]} </div>
      );
      })}


      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e=> setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant="danger" type="submit" onClick={handleUpdate}><span className="text-color">Update</span> </Button>

    </ListGroup>
    <Button variant="outline-danger" className="mt-5" type="submit" onClick={handleDelete}>Delete Account</Button>
  </Card.Body>
</Card>

);
};
