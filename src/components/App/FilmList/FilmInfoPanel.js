import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import rolling from '../../../assets/Rolling.svg';

import fetch from 'node-fetch';

const FilmInfoContainer = styled.div`
  position: absolute;
  top: 0;
  color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 8px;
  left: 100%;
  width: 150px;
  margin-left: 5px;
`;

const FilmPoster = styled.img`
  height: auto;
  width: 130px;
  margin: 10px;
`;

const FilmPlot = styled.div`
  font-size: 12px;
  font-weight: normal;
  margin-bottom: 6px;
`;

const FilmDate = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-style: italic;
`;

const LoadingSpinner = styled.img.attrs({
  src: rolling,
  alt: 'spinner',
})``;

export class FilmInfoPanel extends PureComponent {
  static propTypes = {
    film: PropTypes.object,
  };

  state = {
    loading: true,
  };

  async componentWillMount() {
    if (!this.state.film) {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=fd0df1cd&t=${this.props.film.name}`
      );
      const json = await response.json();
      this.setState({
        film: json,
        loading: false,
      });
    }
  }

  render() {
    const { film } = this.props;

    return (
      <FilmInfoContainer>
        {film.name}
        {this.state.loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <FilmPoster src={this.state.film.Poster} />
            <FilmPlot>{this.state.film.Plot}</FilmPlot>
            <FilmDate>{this.state.film.Released}</FilmDate>
          </div>
        )}
      </FilmInfoContainer>
    );
  }
}
