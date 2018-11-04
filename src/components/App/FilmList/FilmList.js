import React, { PureComponent } from 'react';
import styled from 'styled-components';

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

export default class FilmList extends PureComponent {
  state = {
    films: [],
    loading: true,
    selectedFilm: null,
  };

  async componentDidMount() {
    document.body.addEventListener('mousedown', this.onPageClick);

    await this.refreshFilmList();
  }

  async refreshFilmList() {
    const count = await this.calculateVoteCount(count);
    await this.setFilmlistState(count);
  }

  async setFilmlistState(count) {
    filmsRef.once('value', async snapshot => {
      const filmSnapshot = snapshot.val();
      const keyedFilms = Object.keys(filmSnapshot).map(filmKey => {
        const film = filmSnapshot[filmKey];
        return { ...film, id: filmKey, votes: count[filmKey] || 0 }
      });

      await this.setState({
        films: keyedFilms.sort((a, b) => {
          return b.votes - a.votes
        }),
        loading: false,
      });
    })
  }

  async calculateVoteCount() {
    let count = {};

    await votesRef.once('value').then(async snapshot => {
      if (snapshot.val()) {
        const votes = await Object.values(snapshot.val());
        votes.map(v => v.fid).forEach((i) => {
          count[i] = (count[i] || 0) + 1;
        });
      }
    });

    return count
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
    await this.refreshFilmList()
  };

  render() {
    const { films } = this.state;

    return this.state.loading ? (
      <LoadingSpinner/>
    ) : (
      <List>
        <FilmListContainer>
          {films.map(
            film =>
              !film.watched && (
                <Film
                  film={film}
                  id={film.id}
                  key={film.id}
                  onUpvote={this.onUpvote}
                  onFilmSelect={this.onFilmSelect}
                />
              )
          )}
        </FilmListContainer>
        {this.state.selectedFilm && (
          <FilmInfoPanel film={this.state.selectedFilm}/>
        )}
      </List>
    );
  }
}