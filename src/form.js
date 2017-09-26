import React, { Component } from 'react';
import './css/app.css';
import fire from './firebase';

class Form extends Component {
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('films').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <form onSubmit={this.addMessage.bind(this)}>
        <input className="textinput" type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
      </form>
    );
  }
}

export default Form;
