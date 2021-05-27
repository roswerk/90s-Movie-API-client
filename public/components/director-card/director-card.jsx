import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./director-card.scss";
import { Link } from "react-router-dom"; 


export class DirectorCard extends React.Component{
  render(){
    const {movie, onMovieClick, director} = this.props;



    return (
   
    <Card bg="light" border="danger" className="directorCards">
      <Card.Img variant="top" src={director.directorImg} className="poster"/>
      <Card.Body >
        <Card.Title>{director.name}</Card.Title>
        <Card.Text className="movie-text">{director.bio}</Card.Text>
        <Card.Text className="movie-text">{director.birthDate}</Card.Text>
        <Link to={`/movies/${director.name}`}>
        <Button variant="danger link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
    
    );
  }
}


DirectorCard.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    directorImg: PropTypes.string.isRequired,
    birthDate: PropTypes
    })
};