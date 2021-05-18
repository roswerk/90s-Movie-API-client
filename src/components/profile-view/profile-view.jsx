import React from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from 'axios';
import { Link } from 'react-router-dom';


// Modal buttons
let editProfile =  function(){
  let edit = document.getElementsByClassName("editProfile")[0].toggleAttribute("hidden")
  let view = document.getElementsByClassName("viewProfile")[0].toggleAttribute("hidden")
  let defaultKey = document.getElementsByTagName("Nav")[0].toggleAttribute("edit")
  
}
let profile = function (){
  let profile = document.getElementsByClassName("viewProfile")[0].toggleAttribute("hidden")
  let edit = document.getElementsByClassName("editProfile")[0].toggleAttribute("hidden")
  let defaultKey = document.getElementsByTagName("Nav")[0].toggleAttribute("first")
}

export class ProfileView extends React.Component{
  constructor(){
    super();
    this.state = {
      userName: '',
      password: '',
      email: '',
      birthDate: '',
      favoriteMovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
    this.getUser();
    }
  }

  getUser() {
    this.setState({
      userName: localStorage.getItem('user'),
      email: localStorage.getItem('email'),
      birthDate: localStorage.getItem('birthDate').slice(1,11),
      favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies'))
    });
  }

  
    handleChange(e, favorites) {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ [favorites.target.name]: favorites.target.value });
    }
  


  

  render(){
    const { userName, email, birthDate, favoriteMovies} = this.state;

return(
<Card>
  <Card.Header>
    <Nav variant="tabs" defaultActiveKey="#first">
      <Nav.Item>
        <Nav.Link href="#first" onClick={profile}>Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#edit" onClick={editProfile}>Edit profile</Nav.Link>
      </Nav.Item>
    </Nav>
  </Card.Header>

  <Card.Body hidden={false} className="viewProfile">
    <Card.Title>My Account</Card.Title>
    <Card.Text>
      Hello fellow movies enthusiastic &#128253;
      </Card.Text>
    <ListGroup className="list-group-flush mt-4">
    <ListGroupItem> Username: <span className='text-color'>{userName}</span></ListGroupItem>
    <ListGroupItem> Email: <span className='text-color'>{email}</span></ListGroupItem>
    <ListGroupItem> Birth date: <span className='text-color'>{birthDate}</span></ListGroupItem>
     <ListGroupItem> My Favorite Movies:  {favoriteMovies}</ListGroupItem> 
  </ListGroup>
    <Button variant="primary mt-5">Go somewhere</Button>
    </Card.Body>


    <Card.Body hidden={true} className="editProfile">
    <Card.Title>Edit Account</Card.Title>
    <Card.Text>
      Here you can update your details here or delete your account. But trust us, you wont want to &#128524;
    </Card.Text>
    
    <ListGroup className="list-group-flush mt-4">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
    <Button variant="primary">Go somewhere</Button>
    </Card.Body>

</Card>)

    
  }}

  export default ProfileView;