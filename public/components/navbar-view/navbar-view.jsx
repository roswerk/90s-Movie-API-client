import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

let logout = function (){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  localStorage.removeItem("birthDate");
  localStorage.removeItem("favoriteMovies");

  window.open("/", "_self");
}

export class NavbarView extends React.Component{

  constructor(){
    super();
  }

  render(){
    return(<Container>
  <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark" fixed="top">
    <Navbar.Brand href="/">90sMovies</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href='/profile'>Profile</Nav.Link>
    </Nav>
  
    <Form inline>
      <VisibilityFilterInput visibilityFilter={this.props.visibilityFilter} />
      <Button onClick={() => logout()} variant="outline-light">Logout</Button>
    </Form>
    
    </Navbar.Collapse>
  </Navbar>
  </Container>

    )}}
export default NavbarView;