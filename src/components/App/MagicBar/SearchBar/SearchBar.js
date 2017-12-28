import React, { PureComponent } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  
`;

class SearchBar extends PureComponent {
  state = {
    value: ''
  };

  onChange = event => {
    this.setState({ value: event.target.value })
  };

  render() {
    const { value } = this.state;

    return (
      <StyledInput id={'searchBar'}
        placeholder={`Add a film`}
        value={value}
        onChange={this.onChange}
      />
    )
  }
}

export default SearchBar
