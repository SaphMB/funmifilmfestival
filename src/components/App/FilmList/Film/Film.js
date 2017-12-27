import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Film extends PureComponent {
  static propTypes = {
    score: PropTypes.number,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  onLikeClick = () => {
    const { onUpvote, id, score } = this.props;
    onUpvote(id, score + 1)
  };

  render() {
    console.log(this.props.id)
    const { score, title } = this.props;
    return (
      <div>
        {title} | Score: {typeof score !== 'undefined' ? score : 'N/A'}
        <button onClick={this.onLikeClick}>
          <span role="img" aria-label="thumbs up">
            👍
          </span>
        </button>
      </div>
    )
  }
}

export default Film
