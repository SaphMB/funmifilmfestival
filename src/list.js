import React from 'react';
import './css/app.css';
import Film from './film';

function List() {
  return (
    <table>
      <thead>
        <tr>
          <th>Film</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        <Film name="Batman" user="me"/>
      </tbody>
    </table>
  );
}

export default List;
