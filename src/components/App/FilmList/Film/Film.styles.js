import styled from 'styled-components';

export const LikeButton = styled.button`
  align-self: flex-end;
  background: none;
  border: solid 1px;
  border-color: inherit;
  border-radius: 2px;
  margin: 2px;
  color: inherit;

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
  border-bottom: 1px solid grey;
  cursor: pointer;
  padding: 5px 8px 0;
  
  &:hover {
    background-color: #ffcf4a;
    color: black;
  }
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
  margin-bottom: 1px;
`;

export const UserName = styled.span`
  font-size: 11px;
  opacity: 0.5;
  margin-left: 4px;
  margin-bottom: 1px;
`;

export const FilmScore = styled.span`
  font-size: 20px;
  align-self: flex-end;
  padding: 0 15px;
`;
