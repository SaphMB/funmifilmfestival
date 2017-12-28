import React, { PureComponent } from 'react'

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
      <input
        placeholder={`Search for film`}
        value={value}
        onChange={this.onChange}
      />
    )
  }
}

export default SearchBar