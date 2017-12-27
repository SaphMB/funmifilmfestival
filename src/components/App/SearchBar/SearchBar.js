import React, { PureComponent } from 'react'
import styled from 'styled-components'

import SearchBar from './SearchBar/SearchBar'
import AddButton from './AddButton/AddButton'

const Container = styled.section`
  display: flex;
  padding: 1rem 0;
  align-items: center;
`


class MagicBar extends PureComponent {
  render() {
    return (
      <Container>
        <SearchBar />
        <AddButton />
      </Container>
    )
  }
}

export default MagicBar
