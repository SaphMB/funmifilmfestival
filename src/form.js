import React, { Component } from 'react';
import './css/app.css';
import fire from './firebase';

class Form extends Component {
  addMessage(e){
    e.preventDefault();
    var input = this.inputEl.value;
    var ref = fire.database().ref("films");
    var newfilmref = ref.push();
    newfilmref.set({
      'user_name': this.props.user.displayName,
      'name': input
    });
    this.inputEl.value = '';
  }
  render() {
    return (
      <form onSubmit={this.addMessage.bind(this)}>
        <input className="textinput" placeholder="Add film" type="text" ref={ el => this.inputEl = el }/>
        <br />
        <input type="submit"/>
      </form>
    );
  }
}

export default Form;
