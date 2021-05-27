import React from "react";
import "./director-view.scss";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export class DirectorView extends React.Component{

  render(){
    const {movie, director, onBackClick} = this.props;  

    return(

    <div className="director-view">
      <Row>
        <Col>
      <div className="director-poster">
        <img src={director.directorImg} alt="Director Image" className="director-poster"/>
      </div>
      </Col>
      <Col>
      <div className="Director-name">
        <span className="label">Name: </span>
        <span className="value">{director.name}</span>
      </div>
      <div className="Director-bio mt-5">
        <span className="label">Bio: </span>
        <span className="value">{director.bio}</span>
      </div>
      <div className="Director-DOB mt-5">
        <span className="label">Date of Birth: </span>
        <span className="value">{JSON.stringify(director.birthDate).slice(1,11)}</span>
      </div>
      </Col>
      </Row>
 <Row className="mt-3">
   <Col>
      <Link to={"/"}>
      <Button variant="danger link">Movies</Button>
      </Link>
 
      <Button onClick={() => {onBackClick(null);}} className="ml-3" variant="danger">Back</Button>
      </Col>
      </Row>
      </div>

    )}
}