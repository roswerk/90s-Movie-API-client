import React from "react";
import axios from "axios";
import "./main-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import {connect} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";

// #0
import {setMovies} from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";

import {MovieView} from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view";
import {RegistrationView} from "../registration-view/registration-view";
import {DirectorView} from "../director-view/director-view";
import {GenreView} from "../genre-view/genre-view";
import {NavbarView} from "../navbar-view/navbar-view";
import {ProfileView} from "../profile-view/profile-view";
import {ProfileUpdate} from "../profile-view/profile-update";

export class MainView extends React.Component{

constructor(){
super();
this.state = {
selectedMovie: null,
user: null,
newUser: null,
directors: [],
userInfo: {}
};
}

componentDidMount() {
let accessToken = localStorage.getItem('token');
if (accessToken !== null) {
this.setState({
user: localStorage.getItem('user')
});
this.getMovies(accessToken);
}
}

setSelectedMovie(movie){
this.setState({
selectedMovie: movie
});
};

onLoggedIn(authData) {
this.setState({
user: authData.userObj.userName,
});

localStorage.setItem('token', authData.token);
localStorage.setItem('user', authData.userObj.userName);
localStorage.setItem('email', authData.userObj.email);
localStorage.setItem('birthDate', JSON.stringify(authData.userObj.birthDate));
localStorage.setItem('favoriteMovies', JSON.stringify(authData.userObj.favoriteMovies));
this.getMovies(authData.token);
}

getMovies(token) {
axios.get('https://api90smovies.herokuapp.com/movies', {
headers: { Authorization: `Bearer ${token}`}
})
.then(response => {
this.props.setMovies(response.data)

})
.catch(function (error) {
console.log(error);
});
}

onRegistring(newUser){
this.setState({
newUser
})
};

onLoggedOut(){
localStorage.removeItem("token");
localStorage.removeItem("user");
this.setState({
user: null
});

}

updateUser(data) {
  this.setState({
    userInfo: data
  });
  localStorage.setItem('user', data.userName);
  localStorage.setItem('email', data.email);
  localStorage.setItem('birthDate', data.birthDate);
}


render() {
const {newUser, directors, genres, userInfo} = this.state;
let { movies } = this.props;
let { user } = this.state;

return (
<Router>
  <Row className="main-view justify-content-md-center">

    <Route exact path="/" render={()=> {

      if (!user){ return <Col>
      <LoginView onLoggedIn={user=> this.onLoggedIn(user)} />
        </Col>}

        return(
        <div>
          <NavbarView />
          <MoviesList movies={movies}/>
        </div>)
        }} />

        <Route exact path="/register" render={()=> {
          return <Col>
          <RegistrationView />
          </Col>
          }} />


          <Route path="/movies/:movieId" render={({match, history})=> {
            return <Row>
              <NavbarView />
              <Col md={8}>
              <MovieView movie={movies.find(m=> m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
                </Col>
            </Row>
            }} />


            <Route path="/genres/:name" render={({ match, history })=> {
              if (movies.length === 0) return
              <div className="main-view" />
              return <Row>
                <NavbarView />
                <Col md={8}>
                <GenreView genre={movies.find(g=> g.genre.name === match.params.name).genre} onBackClick={() =>
                  history.goBack()} />
                  </Col>
              </Row>
              }
              } />

              <Route path="/directors/:name" render={({ match, history })=> {
                if (movies.length === 0) return
                <div className="main-view" />
                return <Row>
                  <NavbarView />
                  <Col md={8}>
                  <DirectorView director={movies.find(m=> m.director.name === match.params.name).director}
                    onBackClick={() => history.goBack()} />
                    </Col>
                </Row>
                }
                } />

            <Route path='/profile' render={({history}) => {

                  // if (!user) return (
                  // <Col md={6}>
                  //   <LoginView onLoggedIn = {user => this.onLoggedIn(user)} />
                  // </Col>)

                  // if (movies.length === 0) return <div className='main-view' />;

                  return (
                    <Container>
                      <NavbarView/>
                  <Col md={12}>
                    <ProfileView userInfo={userInfo} movies={movies} onBackClick={() => history.goBack()} />
                  </Col>
                  </Container>)
                }} />

<Route path='/update' render={({ history }) => {
           
                  return (
                    <Container>
                    <NavbarView/>
                  <Col md={12}>
                    <ProfileUpdate userInfo={userInfo} user={user} updateUser={data => this.updateUser(data)} onBackClick={() => history.goBack()} />
                  </Col>
                  </Container>)

                }} />

</Row>
</Router>
)
}
}

let mapStateToProps = state => {
  return {movies: state.movies}
}

export default connect(mapStateToProps, {setMovies})(MainView);