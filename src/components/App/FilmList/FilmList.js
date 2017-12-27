import React, { PureComponent } from 'react'
import styled from 'styled-components'
import map from 'lodash/map'

import fire from '../../../firebase.js'
import Film from './Film/Film'

const Container = styled.ul`
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 8px;
  color: white;
`;

let filmsRef = fire.database().ref('films');


class FilmList extends PureComponent {
  state = {
    films: []
  };

  componentDidMount() {
    filmsRef.on('value', snapshot => {
      this.setState({ films: snapshot.val() })
    });
  }

  updateFilmScore = (state, id, score) => ({
    ...state,
    films: map(state.films,
      (film, filmId) => (filmId !== id ? film : { ...film, votes: score })
    )
  });

  onUpvote = (id, newScore) => {
    this.setState(state => this.updateFilmScore(state, id, newScore))
  };

  render() {
    const { films } = this.state;
    return (
      <Container>
        {map(films, (film, id) => (
          <Film
            title={film.name}
            score={film.votes}
            id={id}
            key={id}
            onUpvote={this.onUpvote}
          />
        ))}
      </Container>
    )
  }
}

export default FilmList
