import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./genre-card.scss";
import { Link } from "react-router-dom"; 


export class GenreCard extends React.Component{
  render(){
    const {movie, onMovieClick, genre} = this.props;



    return (
   
    <Card bg="light" border="danger" className="genreCards">
      <Card.Img variant="top" src={genre.genreImg} className="poster"/>
      <Card.Body >
        <Card.Title>{genre.name}</Card.Title>
        <Card.Text className="movie-text">{genre.description}</Card.Text>
        {/* <Card.Text className="movie-text">{genre.birthDate}</Card.Text> */}
        <Link to={`/genre/${genre.name}`}>
        <Button variant="danger link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
    
    );
  }
}


GenreCard.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genreImg: PropTypes.string.isRequired //,
    // birthDate: PropTypes
    })
};