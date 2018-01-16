import React, { Component } from 'react';
import styled from 'styled-components';
import { auth, provider } from '../../firebase.js';

import Header from './Header/Header';
import MagicBar from './MagicBar/MagicBar';
import FilmList from './FilmList/FilmList';
import UserManagement from './UserManagement/UserManagement';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

class App extends Component {
  state = { user: null };

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null,
      });
    });
  };

  login = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user,
      });
    });
  };

  render() {
    return (
      <Container>
        <UserManagement
          user={this.state.user}
          login={this.login}
          logout={this.logout}
        />
        <Header />
        <MagicBar user={this.state.user} />
        {this.state.user && <FilmList />}
      </Container>
    );
  }
}

export default App;
