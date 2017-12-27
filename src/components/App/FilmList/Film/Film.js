import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LikeButton = styled.button`
  align-self: flex-end;
`

const FilmContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

class Film extends PureComponent {
  static propTypes = {
    score: PropTypes.number,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  onLikeClick = () => {
    const { onUpvote, id, score } = this.props;
    onUpvote(id, score + 1)
  };

  render() {
    const { score, title } = this.props;
    return (
      <FilmContainer>
        {title} | Score: {typeof score !== 'undefined' ? score : 'N/A'}
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
