import React from "react";
import ReactDOM from "react-dom"; 
import Container from "react-bootstrap/Container";

import {createStore} from "redux";
import {Provider} from "react-redux";
import moviesApp from "./reducers/reducers";
import {devToolsEnhancer} from "redux-devtools-extension";

import MainView from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle ./index.scss
import "./index.scss"

const store = createStore(moviesApp, devToolsEnhancer());

class MyFlixApplication extends React.Component{
  render(){
    return (
// <Container> //
  <Provider store={store}>

  <Container className="mainView-Margin">

  <MainView/>
  </Container>
  </Provider>
//  </Container>
  );}
};

// Finds the root of your APP
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your APP in the root DOM Element
ReactDOM.render(React.createElement(MyFlixApplication), container);

