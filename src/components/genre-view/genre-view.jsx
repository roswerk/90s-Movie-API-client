import React from "react";
import "./genre-view.scss";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export class GenreView extends React.Component{

  render(){
    const {movie, genre, onBackClick} = this.props;

    return(

    <div className="genre-view">
      <div className="genre-poster">
        <img src={genre.genreImg} alt="Genre Image" className="poster"/>
      </div>
      <div className="genre-name">
        <span className="label">Type: </span>
        <span className="value">{genre.name}</span>
      </div>
      <div className="genre-description">
        <span className="label">Description: </span>
        <span className="value">{genre.description}</span>
      </div>
      {/* <div className="Director-DOB">
        <span className="label">Related Movies: </span>
        <span className="value">{director.birthDate}</span>
      </div> */}
         
 <Row className="mt-3">
   <Col>
      <Link to={"/"}>
      <Button variant="danger link">Movies</Button>
      </Link>

      {/* <Link to={`/genres/${movie.genre.name}`}>
      <Button variant="link">Genre</Button>
      </Link> */}
 
      <Button onClick={() => {onBackClick(null);}} className="ml-3" variant="danger">Back</Button>
      </Col>
      </Row>
      </div>

    )}
}