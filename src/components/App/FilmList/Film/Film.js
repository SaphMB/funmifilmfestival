import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LikeButton = styled.button`
  align-self: flex-end;
  background: none;
  border: white solid 1px;
  border-radius: 2px;
  margin: 2px;
  color: white;
  
  &:active {
    background: white;
    color: black;
  }
`;

const FilmContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FilmName = styled.span`
  font-size: 16px;
`;

const FilmScore = styled.span`
  font-size: 12px;
  align-self:flex-end;  
  padding: 0 15px;
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
        <FilmName>{film.name}</FilmName>
        <div>
          <FilmScore >{typeof film.votes !== 'undefined' ? film.votes : 'N/A'}</FilmScore>
          <LikeButton onClick={this.onLikeClick}>
            vote!
          </LikeButton>
        </div>
      </FilmContainer>
    )
  }
}

export default Film
