import React, { PureComponent } from 'react';
import styled from 'styled-components';
import fire from 'firebase';

import SearchBar from './SearchBar/SearchBar';
import AddButton from './AddButton/AddButton';

const Container = styled.section`
  display: flex;
  padding: 1rem 0;
  align-items: center;
`;

const filmsRef = fire.database().ref('films');

class MagicBar extends PureComponent {
  state = {
    searchBarText: ''
  };

  isDuplicate = filmName => {
    return filmsRef.once('value').then(snapshot => {
      const films = Object.values(snapshot.val());
      return !(
        films.filter(film => film.name.toLowerCase() === filmName.toLowerCase())
          .length === 0
      );
    });
  };

  onSearchChange = event => {
    this.setState({ searchBarText: event.target.value });
  };

  addFilm = e => {
    e.preventDefault();
    
    let searchBarText = this.state.searchBarText;
    this.isDuplicate(searchBarText).then(result => {
      result
        ? alert('Film already exists!')
        : filmsRef.push({
            name: searchBarText,
            uid: this.props.user.uid,
            user_name: this.props.user.displayName,
            votes: 0,
            watched: false,
            dateWatched: null,
          });
    });
    this.setState({ searchBarText: ''});
  };

  render() {
    return (
      <Container>
        <SearchBar onSearchChange={this.onSearchChange} value={this.state.searchBarText}/>
        <AddButton addFilm={this.addFilm} />
      </Container>
    );
  }
}

export default MagicBar;
