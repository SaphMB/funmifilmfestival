import React, { PureComponent } from 'react'
import styled from 'styled-components'
import fire from 'firebase'

import SearchBar from './SearchBar/SearchBar'
import AddButton from './AddButton/AddButton'

const Container = styled.section`
  display: flex;
  padding: 1rem 0;
  align-items: center;
`;

const filmsRef = fire.database().ref("films");

class MagicBar extends PureComponent {
  isDuplicate = filmName => {
    return filmsRef.once("value")
      .then(snapshot => {
        const films = Object.values(snapshot.val());
        return !(films.filter(film => film.name.toLowerCase() === filmName.toLowerCase()).length === 0)
      })
  };

  addFilm = e => {
    const searchBarValue = document.getElementById('searchBar').value.trim();

    e.preventDefault();

    this.isDuplicate(searchBarValue).then(result => {
      result ? alert('Film already exists!') : filmsRef.push({
        'name': searchBarValue,
        'uid': this.props.user.uid,
        'user_name': this.props.user.displayName,
        'votes': 0
      });
    })
  };

  render() {
    return (
      <Container>
        <SearchBar />
        <AddButton addFilm={this.addFilm}/>
      </Container>
    )
  }
}

export default MagicBar
