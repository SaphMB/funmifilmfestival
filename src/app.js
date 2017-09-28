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
      this.setState({ films: [film].concat(this.state.films) });
    })
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {this.state.user ?
            <button onClick={this.logout}>Log Out</button>
            :
            <button onClick={this.login}>Log In</button>
          }
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Funmi's Film Festival</h2>
        </div>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <p>hi {this.state.user.displayName}</p>
              <img alt='' src={this.state.user.photoURL} />
            </div>
            <div className="Form">
              <p>Add film: </p>
              <Form user={this.state.user}/>
            </div>
          </div>
          :
          <div />
        }
        <div className="List">
          <ul>
            <List films={this.state.films}/>
          </ul>
        </div>
      </div>
    );
  }
  handleChange(e) {
    /* ... */
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
}

export default App;
