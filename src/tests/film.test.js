import React from 'react';
import ReactDOM from 'react-dom';
import Film from '../film';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  ReactDOM.render(<table />, div);
  ReactDOM.render(<tbody />, table);
  ReactDOM.render(<Film />, tbody);
});

it('renders using given props', () => {
  const div = document.createElement('div');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  ReactDOM.render(<table />, div);
  ReactDOM.render(<tbody />, table);
  ReactDOM.render(<Film name="name" user_name="username" key="key" id="id"/>, tbody);
});
