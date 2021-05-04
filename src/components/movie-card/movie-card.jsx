import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss"

export class MovieCard extends React.Component{
  render(){
    const {movie, onMovieClick} = this.props;

    return (<div className="movie-card" onClick={() => {onMovieClick(movie); }}>{movie.title}</div>);
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      placeOfBirth: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};