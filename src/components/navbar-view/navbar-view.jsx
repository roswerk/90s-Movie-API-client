import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

let logout = function (){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  this.setState({
    user: null
  })
}

export class NavbarView extends React.Component{

  constructor(){
    super();
  }

  render(){
    return(<Container>
  <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark" fixed="top">
    <Navbar.Brand href="#home">90sMovies</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="#features">Movies you might like</Nav.Link>
      <Nav.Link href="#pricing">Profile</Nav.Link>
    </Nav>
  
    <Form inline>
      <FormControl type="text" placeholder="Search Movie" className="mr-sm-2 mr-xs-1" id="movieSearch"/>
      <Button onClick={() => logout()} variant="outline-light">Logout</Button>
    </Form>
    
    </Navbar.Collapse>
  </Navbar>
  </Container>

    )}}
export default NavbarView;