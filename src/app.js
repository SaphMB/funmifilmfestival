import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './css/app.css';
import Form from './form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Funmis Film Festival</h2>
        </div>
        <div className="App-intro">
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
