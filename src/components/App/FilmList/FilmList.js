import React, { PureComponent } from 'react';
import styled from 'styled-components';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import ripple from '../../../assets/Ripple.svg';
import fire from '../../../firebase.js';
import Film from './Film/Film';
import { FilmInfoPanel } from './FilmInfoPanel';

export const FilmListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 8px;
  color: white;
`;

const List = styled.div`
  position: relative;
`;

const LoadingSpinner = styled.img.attrs({
  src: ripple,
  alt: 'spinner',
})`
  padding-top: 20px;
`;

let filmsRef = fire.database().ref('films');

class FilmList extends PureComponent {
  state = {
    films: [],
    loading: true,
    selectedFilm: null,
  };

  componentDidMount() {
    document.body.addEventListener('mousedown', this.onPageClick);

    filmsRef.on('value', snapshot => {
      this.setState({
        films: snapshot.val(),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.onPageClick);
  }

  onFilmSelect = film => {
    this.setState({
      selectedFilm: film,
    });
  };

  onPageClick = () => {
    this.setState({
      selectedFilm: null,
    });
  };

  onUpvote = (film, id) => {
    const thisFilm = filmsRef.child(id);

    thisFilm.set({
      name: film.name,
      votes: film.votes + 1,
      user_name: film.user_name,
      uid: film.uid,
    });
  };

  render() {
    const { films } = this.state;
    const keyedFilms = map(films, (film, key) => {
      return { ...film, key };
    });
    const sortedFilms = orderBy(keyedFilms, ['votes'], ['desc']);

    return !this.state.loading ? (
      <List>
        <FilmListContainer>
          {map(sortedFilms, film => !film.watched && (
            <Film
              film={film}
              id={film.key}
              key={film.key}
              onUpvote={this.onUpvote}
              onFilmSelect={this.onFilmSelect}
            />
          ))}
        </FilmListContainer>
        {this.state.selectedFilm && (
          <FilmInfoPanel film={this.state.selectedFilm} />
        )}
      </List>
    ) : (
      <LoadingSpinner />
    );
  }
}

export default FilmList;
