import React, { Component } from 'react';
import fire from './firebase';
import logo from './assets/logo.svg';
import Form from './form';
import List from './list';
import './css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { films: [] };
  }
  componentWillMount(){
    let filmsRef = fire.database().ref('films').orderByKey().limitToLast(100);
    filmsRef.on('child_added', snapshot => {
      let film = { text: snapshot.val(), id: snapshot.key };
      this.setState({ films: [film].concat(this.state.films) });
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Funmi's Film Festival</h2>
        </div>
        <div className="Form">
          <p>Add film: </p>
          <Form />
        </div>
        <div className="List">
          <ul>
            <List films={this.state.films}/>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
