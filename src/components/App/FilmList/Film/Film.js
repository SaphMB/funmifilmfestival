import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import fire from '../../../../firebase.js';

import {
  FilmContainer,
  FilmName,
  FilmScore,
  LikeButton,
  ScoreContainer,
  TitleContainer,
  UserName,
} from './Film.styles';

const votesRef = fire.database().ref('votes');

class Film extends PureComponent {
  state = {
    votes: [],
    loading: true,
  };

  static propTypes = {
    film: PropTypes.object,
    id: PropTypes.string.isRequired,
    onUpvote: PropTypes.func.isRequired,
    onFilmSelect: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.calculateVotes();
  }

  calculateVotes = async () => {
    await votesRef.once('value').then(async snapshot => {
      if (snapshot.val()) {
        const votes = await Object.values(snapshot.val());

        let voteArray = [];
        votes.forEach(vote => {
          if (vote.fid === this.props.film.key) {
            voteArray.push(vote);
          }
        });
        await this.setState({
          votes: voteArray,
        });
      }
      this.setState({
        loading: false,
      });
    });
  };

  onLikeClick = async () => {
    const { onUpvote, film, id } = this.props;
    await onUpvote(film, id);
    this.calculateVotes();
  };

  onFilmClick = () => {
    const { onFilmSelect, film } = this.props;
    onFilmSelect(film);
  };

  render() {
    const { film } = this.props;
    return (
      <FilmContainer onClick={this.onFilmClick}>
        <TitleContainer>
          <FilmName>{film.name}</FilmName>
          <UserName>submitted by: {film.user_name}</UserName>
        </TitleContainer>
        <ScoreContainer>
          <FilmScore>
            {!this.state.loading && this.state.votes.length}
          </FilmScore>
          <LikeButton onClick={this.onLikeClick}>vote!</LikeButton>
        </ScoreContainer>
      </FilmContainer>
    );
  }
}

export default Film;
