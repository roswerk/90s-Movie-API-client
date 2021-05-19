import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./movie-card.scss";
import { Link } from "react-router-dom"; 


export class MovieCard extends React.Component{
  render(){
    const {movie, onMovieClick} = this.props;

    function addFav (e) {
      e.preventDefault();
  
      axios.post(`https://api90smovies.herokuapp.com/users/${localStorage.getItem('user')}/favMovies/${movie._id}`,
      {
        username: localStorage.getItem("user")
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
      ).then(response => {
        localStorage.setItem("favoriteMovies", JSON.stringify(response.data.favoriteMovies));
        alert("Movie has been added to your Favorite list!");
        }). catch (e => {
          console.log("Movie can't be added to your Favorites, because" + e );
          alert("Fav movie already included, can't be readded");
        });
    }

    return (
    <Card bg="light" border="danger" className="movieCards mb-3">
      <Card.Img variant="top" src={movie.imageURL}/>
      <Card.Body >
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="movie-text">{movie.description}</Card.Text>
        <Card.Text className="movie-text">{movie.genre.name}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
        <Button variant="danger link">Open</Button>
        </Link>
        <Button onClick={e => addFav(e)} variant="danger" className="ml-3"><span>&#129293;</span></Button>
      </Card.Body>
    </Card>
    
    );
  }
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      placeOfBirth: PropTypes.string,
      birthDate: PropTypes.string
    })
  }).isRequired
};