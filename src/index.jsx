import React from "react";
import ReactDOM from "react-dom"; 
import MainView  from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

// Import statement to indicate that you need to bundle ./index.scss
import "./index.scss"

class MyFlixApplication extends React.Component{
  render(){
    return (
  <Container>

  <Container className="mainView-Margin">

  <MainView/>
  </Container>
  </Container>
  );}
};

// Finds the root of your APP
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your APP in the root DOM Element
ReactDOM.render(React.createElement(MyFlixApplication), container);

