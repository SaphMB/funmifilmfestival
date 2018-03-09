import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input``;

class SearchBar extends PureComponent {
  render() {
    return (
      <StyledInput
        id={'searchBar'}
        placeholder={`Add a film`}
        value={this.props.value}
        onChange={this.props.onSearchChange}
      />
    );
  }
}

export default SearchBar;
