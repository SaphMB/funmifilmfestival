import React, { Component } from 'react';
import './css/app.css';
import fire from './firebase';

class Form extends Component {
  addMessage(e){
    e.preventDefault();
    var input = this.inputEl.value;
    if(this.checkDuplicate(input)) {
      var ref = fire.database().ref("films");
      var newfilmref = ref.push();
      newfilmref.set({
        'name': input,
        'user_name': this.props.state.user.displayName,
        'votes': 0
      });
    }
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
  checkDuplicate(input) {
    var result = true;
    this.props.state.films.forEach(function(film){
      if(film.text.name.toLowerCase() === input.toLowerCase()) { result = false }
    });
    return result;
  }
}

export default Form;
