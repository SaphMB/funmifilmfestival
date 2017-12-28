import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LikeButton = styled.button`
  align-self: flex-end;
`;

const FilmContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class Film extends PureComponent {
  static propTypes = {
    film: PropTypes.object,
    id: PropTypes.string.isRequired
  };

  onLikeClick = () => {
    const { onUpvote, film, id } = this.props;
    onUpvote(film, id)
  };

  render() {
    const { film } = this.props;
    return (
      <FilmContainer>
        {film.name} | Score: {typeof film.votes !== 'undefined' ? film.votes : 'N/A'}
        <LikeButton onClick={this.onLikeClick}>
          <span role="img" aria-label="thumbs up">
            👍
          </span>
        </LikeButton>
      </FilmContainer>
    )
  }
}

export default Film
