import React from 'react';
import { Accounts } from 'meteor/accounts-base';


export default class PrivateHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  handleLogout () {
    Accounts.logout();
    this.props.appProps.history.replace('/login');
  }

  render() {    
    return (
      <div>
        <button onClick={this.handleLogout.bind(this)}>Logout</button>
      </div>
    )
  }
}