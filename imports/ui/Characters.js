import React from 'react';
import { Accounts } from 'meteor/accounts-base';


export default class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  handleLogout () {
    Accounts.logout();
    this.props.history.replace('/login');
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleLogout()}>Logout</button>
        <p>Hello from Characters Component</p>
      </div>
    )
  }
}