import React, { PureComponent } from 'react';
import styled from 'styled-components';

import logo from './logo.svg';

const Logo = styled.img.attrs({ src: logo })`
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: App-logo-spin infinite 20s linear;
  height: 80px;
`;

const Container = styled.header`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 48px;
  height: 170px;
  color: white;
`;

const Title = styled.h2`
  padding-top: 20px;
`;

class Header extends PureComponent {
  render() {
    return (
      <Container>
        <Logo />
        <Title>Funmi's Film Festival</Title>
      </Container>
    );
  }
}

export default Header;
