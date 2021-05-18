import React from "react";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {NavbarView} from "../navbar-view/navbar-view";
import axios from "axios";



export class MovieView extends React.Component{

  

  render(){
    const {movie, onBackClick} = this.props;

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
        localStorage.setItem("favoriteMovies", JSON.stringify(response.data.FavoriteMovies));
        alert("Movie has been added to your Favorite list!");
        }). catch (e => {
          console.log("Movie can't be added to your Favorites, because" + e );
          alert("Fav movie already included, can't be readded");
        });
    }

    return(
      <div>

      <div>
      <NavbarView/>
      </div>

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
      
        <Row className="mt-3">
        <p className="ml-3">See more about:</p>
        </Row>
        <Col>
      <Link to={`/directors/${movie.director.name}`}>
      <Button variant="danger link">Director</Button>
      </Link>

      <Link to={`/genres/${movie.genre.name}`}>
      <Button variant="danger link" className="ml-3">Genre</Button>
      </Link>

      <Button onClick={() => {onBackClick(null);}} className="ml-3" variant="danger">Back</Button>
      <Button onClick={e => addFav(e)} variant="danger" className="ml-3"><span>&#129293;</span></Button>

      </Col>

    </div>
      </div>);
  }
}