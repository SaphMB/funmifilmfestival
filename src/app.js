
import React, { Component } from 'react';
import fire from './firebase';
import logo from './assets/logo.svg';
// import Form from './form';
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
  addfilm(e){
    e.preventDefault();
    fire.database().ref('films').push( this.inputEl.value );
    this.inputEl.value = '';
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
          <form onSubmit={this.addfilm.bind(this)}>
            <input type="text" ref={ el => this.inputEl = el }/>
            <input type="submit"/>
          </form>
        </div>
        <div className="List">
          <ul>
            <List this={this} />
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
