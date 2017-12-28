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
  checkForDuplicates = filmName => {
    filmsRef.once("value",snapshot => {
      const userData = snapshot.val();
      console.log(userData)
      if (userData){
        console.log("exists!");
      }
  });
};
  
  // checkDuplicate(input) {
  //   var result = true;
  //   this.props.state.films.forEach(function(film){
  //     if(film.text.name.toLowerCase() === input.toLowerCase()) { result = false }
  //   });
  //   return result;
  // }

  addFilm = e => {
    const searchBarValue = document.getElementById('searchBar').value;

    e.preventDefault();

    this.checkForDuplicates(searchBarValue) && filmsRef.push({
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
