import React from "react";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";

export class MovieView extends React.Component{

  render(){
    const {movie, onBackClick} = this.props;

    return(
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.imageURL} alt="Movie Image" className="poster"/>
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.title}</span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.description}</span>
      </div>
      <div className="movie-director">
        <span className="label">Director: </span>
        <span className="value">{movie.director.name}</span>
      </div>
      <Button onClick={() => {onBackClick(null);}} className="mt-5">Back</Button>

    </div>);
  }
}