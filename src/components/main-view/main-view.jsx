import React from "react";
import axios from "axios";
import "./main-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view.jsx";
import {RegistrationView} from "../registration-view/registration-view";

export class MainView extends React.Component{

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      newUser: null
    };
  }

  componentDidMount(){
    axios.get("https://api90smovies.herokuapp.com/movies")
    .then(response =>{
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error)
    });
  };

  setSelectedMovie(movie){
    this.setState({
      selectedMovie: movie
    });
  };

  onLoggedIn(user){
    this.setState({
      user
    });
  }

              onRegistring(newUser){
              this.setState({
              newUser
              })
               }


  render() {
    const {movies, selectedMovie, user, newUser} = this.state;

    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                if(!newUser) return <RegistrationView onRegistring={newUser => this.onRegistring(newUser)}/>;
   
    if (movies.length === 0) return <div className= "main-view"/>;

    return (
    <Row className= "main-view">
      {selectedMovie
      ? ( <Row className="justify-content-md-center">
        <Col md={8}>
        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }}/>
        </Col>
        </Row>
      )
      : ( <Row className="justify-content-md-center">  
      {movies.map(movie => (
        <Col md={6} lg={4}>
        <MovieCard key= {movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {this.setSelectedMovie(newSelectedMovie)}} />
        </Col>
      ))}
      
      </Row>
      )
    }
    </Row>
    );
}
}

export default MainView;