import React, { PureComponent } from 'react'
import styled from 'styled-components'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'

import fire from '../../../firebase.js'
import Film from './Film/Film'

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 8px;
  color: white;
`;

let filmsRef = fire.database().ref('films');


class FilmList extends PureComponent {
  state = {
    films: [],
    loading: true,
  };

  componentDidMount() {
    filmsRef.on('value', snapshot => {
      this.setState({
        films: snapshot.val(),
        loading: false,
      })
    });
  }

  onUpvote = (film, id) => {
    const thisFilm = filmsRef.child(id);

    thisFilm.set({
      name: film.name,
      votes: film.votes + 1,
      user_name: film.user_name,
      uid: film.uid
    });
  };

  render() {
    const { films } = this.state;
    const keyedFilms = map(films, (film, key) => { return { ...film, key } });
    const sortedFilms = orderBy(keyedFilms, ['votes'], ['desc']);

    return (
        !this.state.loading ?
          <Container>
            {map(sortedFilms, film =>
              (<Film
                film={film}
                id={film.key}
                key={film.key}
                onUpvote={this.onUpvote}
              />)
            )}
        </Container> : null
      )
    }
}

export default FilmList
