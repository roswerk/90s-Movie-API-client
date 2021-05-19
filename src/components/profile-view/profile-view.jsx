import React from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from 'axios';

// Modal buttons
let editProfile =  function(){
  let defaultKey = document.getElementsByTagName("Nav")[0].toggleAttribute("edit")
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
      birthDate: localStorage.getItem('birthDate').slice(0,11),
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

  //Update profile
  const handleUpdate = e => {
    e.preventDefault();
    const userInfo = {
      userName: username,
      password: password,
      email: email,
      birthDate: birthday
    };

    axios.put(`https://api90smovies.herokuapp.com/user/${userName}`, userInfo, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      updateUser(userInfo);
      alert("Profile has been Updated");
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
  };

return(
<Card>
  <Card.Header>
    <Nav variant="tabs" defaultActiveKey="/profile">
      <Nav.Item>
        <Nav.Link href="/profile">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/update" onClick={editProfile}>Edit profile</Nav.Link>
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
     <ListGroupItem className="mt-5"> My Favorite Movies:   
     <div>
            <ListGroup variant="flush">
              {favoriteMovieList.map(favoriteMovies => (
                  <ListGroup.Item key={favoriteMovies._id} >
                  <Button onClick={() => this.removeFavorite(favoriteMovies)} size="sm" variant="outline-danger mr-3"><span className="light">Delete</span></Button> 
                    <span className='text-color'>{favoriteMovies.title}</span>                   
                  </ListGroup.Item>))}
            </ListGroup> 
      </div></ListGroupItem>  
  </ListGroup>
    </Card.Body>
</Card>)
  }}

  export default ProfileView;