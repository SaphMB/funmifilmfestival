import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './css/app.css';
import Form from './form';
import List from './list';

class App extends Component {
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
            <List />
        </div>
      </div>
    );
  }
}

export default App;
