import React from 'react';
import './css/app.css';
import Film from './film';

function List(Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Film</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
          { Props.this.state.films.map( film => <Film name={film.text} user={film.id} />) }
      </tbody>
    </table>
  );
}

export default List;
