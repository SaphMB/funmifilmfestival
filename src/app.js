import React, { Component } from 'react';
import fire, { auth, provider } from './firebase.js';
import logo from './assets/logo.svg';
import Form from './form';
import List from './list';
import './css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentWillMount(){
    let filmsRef = fire.database().ref('films').orderByKey().limitToLast(100);
    filmsRef.on('child_added', snapshot => {
      let film = { text: snapshot.val(), id: snapshot.key };
      var films = [film].concat(this.state.films)
      this.sortFilms(films);
      this.setState({ films: films });
    })
    filmsRef.on('child_removed', snapshot => {
      var films = this.state.films
      this.removeFilm(films, snapshot.key)
      this.sortFilms(films);
      this.setState({ films: films });
    })
    filmsRef.on('child_changed', snapshot => {
      let film = { text: snapshot.val(), id: snapshot.key };
      var films = this.state.films
      this.removeFilm(films, snapshot.key)
      films = [film].concat(this.state.films)
      this.sortFilms(films);
      this.setState({ films: films });
    })
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          {this.state.user ?
          <div className="user-management">
            <button className="button" onClick={this.logout}>Log Out</button>
            <div className='user-profile'>
              <img alt='' src={this.state.user.photoURL} />
            </div>
          </div>
          :
          <div className="user-management">
            <button className="button" onClick={this.login}>Log In</button>
          </div>
          }
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Funmi's Film Festival</h2>
          </div>
        </div>
        {this.state.user ?
          <div>
            <div className="Form">
              <Form state={this.state}/>
            </div>
            <div className="List">
              <List films={this.state.films} user={this.state.user} app={this}/>
            </div>
          </div>
          :
          <div className="box">
            <h4>Please Login</h4>
          </div>
        }

      </div>
    );
  }
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  sortFilms(films) {
    films.sort(function(a,b) {
      return b.text.votes - a.text.votes;
    });
  }
  removeFilm(films, id) {
    for(var i = 0; i < films.length; i++) {
      if(films[i].id === id) {
        films.splice(i, 1);
        break;
      }
    }
  }
}

export default App;
