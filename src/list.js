import React, { Component } from 'react';
import './css/app.css';
import Film from './film';

class List extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Film</th>
          </tr>
        </thead>
        <tbody>
            { this.props.films.map( film => <Film name={film.text} user={film.id} />) }
        </tbody>
      </table>
    );
  }
}

export default List;
