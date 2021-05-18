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

  
    handleChange(e, favoriteMovies) {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ [favoriteMovies.target.name]: favoriteMovies.target.value });
    }
  
//Delete Movie from user favorite list
removeFavorite(favorite) {   
  axios.delete(`https://api90smovies.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${favorite._id}/`, 
   { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
  }).then(response => {
    localStorage.setItem('favoriteMovies', JSON.stringify(response.data.favoriteMovies));
    this.getUser();
    alert(`${favorite.title} has been removed from your Favorite list!`);
  }).catch (err => {
    console.log(err.response);
    alert("Movie can't be removed")
  });
}



  render(){
    const { userName, email, birthDate, favoriteMovies} = this.state;
    
    const favoriteMovieList = this.props.movies.filter((movie => {
      return (
        favoriteMovies.includes(movie._id)
      );
    }));

      //Delete Profile
  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`https://api90smovies.herokuapp.com/users/delete/${userName}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
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
     <ListGroupItem className="mt-5"> My Favorite Movies:   <div>
                    <ListGroup variant="flush">
                      {favoriteMovieList.map(favoriteMovies => (
                        <ListGroup.Item key={favoriteMovies._id} >
                          <Button onClick={() => this.removeFavorite(favoriteMovies)} variant="light"><span className="light">X</span></Button> 
                          <span className='text-color'>
                          {
                            favoriteMovies.title
                          }
                          </span>
                                                    
                        </ListGroup.Item>                        
                      ))}
                    </ListGroup> 
                </div></ListGroupItem>  
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
    <Button variant="outline-danger" className="mt-5" type='submit' onClick={handleDelete}>Delete Account</Button>
    </Card.Body>

</Card>)

    
  }}

  export default ProfileView;