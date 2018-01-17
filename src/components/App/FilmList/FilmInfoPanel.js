import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilmInfoContainer = styled.div`
  position:absolute;
  top: 0;
  color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 8px;
  left: 100%;
  width: 50%;
  margin-left: 5px;
`;

export class FilmInfoPanel extends PureComponent {
  static propTypes = {
    film: PropTypes.object,
  };

  render() {
    const { film } = this.props;
    return (
      <FilmInfoContainer>
        {film.name}
      </FilmInfoContainer>
    );
  }
}
