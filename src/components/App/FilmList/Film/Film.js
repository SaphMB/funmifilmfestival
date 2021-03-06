import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  FilmContainer,
  FilmName,
  FilmScore,
  LikeButton,
  ScoreContainer,
  TitleContainer,
  UserName,
} from './Film.styles';

class Film extends PureComponent {
  static propTypes = {
    film: PropTypes.object,
    id: PropTypes.string.isRequired,
    onUpvote: PropTypes.func.isRequired,
    onFilmSelect: PropTypes.func.isRequired,
  };

  onLikeClick = async () => {
    const { onUpvote, film, id } = this.props;
    await onUpvote(film, id);
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
            {film.votes}
          </FilmScore>
          <LikeButton onClick={this.onLikeClick}>vote!</LikeButton>
        </ScoreContainer>
      </FilmContainer>
    );
  }
}

export default Film;
