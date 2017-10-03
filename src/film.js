import React from 'react';
import firebase from './firebase.js';
import './css/app.css';

function Film(Props) {
  return (
    <tr>
      <td>{Props.film.text.name}</td>
      <td>{Props.film.text.user_name}</td>
      <td>{Props.film.text.votes}</td>
      { voteButton(Props) }
      { deleteButton(Props) }
    </tr>
  );
}

function voteButton(Props) {
  return <td><button className="vote" onClick={() => vote(Props.film.id, Props)}>Vote</button></td>
}

function vote(id, Props) {
  var film = firebase.database().ref('films').child(id);
  film.set({
    name: Props.film.text.name,
    user_name: Props.film.text.user_name,
    votes: Props.film.text.votes + 1
  });
}

function removeItem(id) {
  firebase.database().ref('films').child(id).remove();
};

function deleteButton(Props) {
  if(Props.film.text.user_name === Props.user.displayName) {
    return <td><button className="delete" onClick={() => removeItem(Props.film.id)}>Delete</button></td>
  }
  else {
    return <td></td>;
  }
}

export default Film;
