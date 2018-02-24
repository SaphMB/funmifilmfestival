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
  color: white;
  min-width: 400px;
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

const filmsRef = fire.database().ref('films');
const votesRef = fire.database().ref('votes');

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

  createNewVote = async id => {
    await votesRef.push({
      uid: this.props.user.uid,
      fid: id,
    });
    console.log('voted!');
  };

  onUpvote = async (film, id) => {
    await votesRef.once('value').then(async snapshot => {
      if (snapshot.val()) {
        const votes = Object.values(snapshot.val());

        let voteExists = false;
        votes.forEach(vote => {
          if (vote.uid === this.props.user.uid && vote.fid === id) {
            console.log('exists!');
            voteExists = true;
          }
        });
        if (!voteExists) {
          this.createNewVote(id);
        }
      } else {
        this.createNewVote(id);
      }
    });
  };

  render() {
    const { films } = this.state;
    const keyedFilms = map(films, (film, key) => {
      return { ...film, key };
    });
    const sortedFilms = orderBy(keyedFilms, ['name'], ['asc']);

    return !this.state.loading ? (
      <List>
        <FilmListContainer>
          {map(
            sortedFilms,
            film =>
              !film.watched && (
                <Film
                  film={film}
                  id={film.key}
                  key={film.key}
                  onUpvote={this.onUpvote}
                  onFilmSelect={this.onFilmSelect}
                />
              )
          )}
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
