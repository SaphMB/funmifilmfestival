import React, { Component } from 'react';
import './css/app.css';
import fire from './firebase';

class Form extends Component {
  addMessage(e){
    e.preventDefault();
    fire.database().ref('films').push( this.inputEl.value );
    this.inputEl.value = '';
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
