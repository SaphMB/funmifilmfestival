import React from 'react';
import firebase from './firebase.js';
import './css/app.css';

function Film(Props) {
  return (
    <tr>
      <td>{Props.film.text.name}</td>
      <td>{Props.film.text.user_name}</td>
      {Props.film.text.user_name === Props.user.displayName ? <td><button className="delete" onClick={() => removeItem(Props.film.id, Props.app)}>Delete</button></td> : <td></td>}
    </tr>
  );
}

function removeItem(id, app) {
  firebase.database().ref('films').child(id).remove();
  var films = app.state.films
  for(var i = 0; i < films.length; i++) {
      if(films[i].id === id) {
          films.splice(i, 1);
          break;
      }
  }
  app.forceUpdate();
};

export default Film;
