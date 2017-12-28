import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class AddButton extends PureComponent {
  static propTypes = {
    addFilm: PropTypes.func.isRequired
  };

  render() {
    return <button onClick={this.props.addFilm}>+</button>
  }
}

export default AddButton
