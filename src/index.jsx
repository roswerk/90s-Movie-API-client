import React from "react";
import ReactDOM from "react-dom"; 
import MainView  from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

// Import statement to indicate that you need to bundle ./index.scss
import "./index.scss"

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component{

  render(){
    return (
  <Container>
<Container>
  <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark" fixed="top">
    <Navbar.Brand href="#home">90sMovies</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Movies you might like</Nav.Link>
      <Nav.Link href="#pricing">Profile</Nav.Link>
    </Nav>
  
    <Form inline>
      <FormControl type="text" placeholder="Search Movie" className="mr-sm-2 mr-xs-1" id="movieSearch"/>
    </Form>
    </Navbar.Collapse>
  </Navbar>
  </Container>
  <Container className="mainView-Margin">
  <MainView/>
  </Container>
  </Container>
  );}

};

// Finds the root of your APP
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your APP in the root DOM Element
ReactDOM.render(React.createElement(MyFlixApplication), container);