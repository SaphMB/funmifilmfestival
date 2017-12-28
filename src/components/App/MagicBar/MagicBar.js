import React, { PureComponent } from 'react'
import styled from 'styled-components'
import fire from 'firebase'

import SearchBar from './SearchBar/SearchBar'
import AddButton from './AddButton/AddButton'

const Container = styled.section`
  display: flex;
  padding: 1rem 0;
  align-items: center;
`

class MagicBar extends PureComponent {
  addFilm = e => {
    const searchBarValue = document.getElementById('searchBar').value;
    const filmsRef = fire.database().ref("films");

    e.preventDefault();
    filmsRef.push({
      'name': searchBarValue,
      'uid': this.props.user.uid,
      'user_name': this.props.user.displayName,
      'votes': 0
    });
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
