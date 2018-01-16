import styled from 'styled-components';

export const LikeButton = styled.button`
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

export const FilmContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-right: 20px;
`;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const FilmName = styled.span`
  font-size: 16px;
`;

export const UserName = styled.span`
  font-size: 11px;
  margin-left: 4px;
  opacity: 0.5;
`;

export const FilmScore = styled.span`
  font-size: 20px;
  align-self: flex-end;
  padding: 0 15px;
`;
