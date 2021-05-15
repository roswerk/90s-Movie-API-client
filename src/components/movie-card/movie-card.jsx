import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./movie-card.scss";
import { Link } from "react-router-dom"; 


export class MovieCard extends React.Component{
  render(){
    const {movie, onMovieClick} = this.props;



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