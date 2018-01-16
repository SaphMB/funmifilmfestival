import React, { Component } from 'react';
import styled from 'styled-components';

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 10px;
  top: 10px;
  width: 150px;
  font-size: 10px;
  color: white;
`;

const UserAvatar = styled.img`
  width: 100%;
`;

class UserManagement extends Component {
  render() {
    return this.props.user ? (
      <UserContainer>
        <button className="button" onClick={this.props.logout}>
          Log Out
        </button>
        <UserAvatar src={this.props.user.photoURL} />
      </UserContainer>
    ) : (
      <UserContainer>
        <button className="button" onClick={this.props.login}>
          Log In
        </button>
      </UserContainer>
    );
  }
}

export default UserManagement;
