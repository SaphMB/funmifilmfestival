import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './Header/Header'
import SearchBar from './SearchBar/SearchBar'
import FilmList from './FilmList/FilmList'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:20px;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <SearchBar />
        <FilmList />
      </Container>
    )
  }
}

export default App
