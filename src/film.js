import React from 'react';
import './css/app.css';

function Film(Props) {
  return (
    <tr>
      <td>{Props.name}</td>
      <td>{Props.user_name}</td>
    </tr>
  );
}

export default Film;
