import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

export class PrivateHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout () {
    Accounts.logout();
    this.props.appProps.history.replace('/login');
  }

  handleNavToggle () {
    Session.set('isNavOpen', !Session.get('isNavOpen'))
  }

  render() {
    const navImageSrc = this.props.isNavOpen ? "/images/x.svg" : "/images/bars.svg";    

    return (
      <div className="header">
        <div className="header__content">
          <img className="header__nav-toggle" onClick={this.handleNavToggle} src={navImageSrc}/>
          <h1 className="header__title">{this.props.title}</h1>
          <div>
            <Link className="link" to="/dashboard">Home</Link>
            <Link className="link" to="/admin">Admin</Link>
            <button className="button button--link-text" onClick={this.handleLogout.bind(this)}>Logout</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker(() => {
  const isNavOpen = Session.get('isNavOpen');

  return {
    isNavOpen
  }
})(PrivateHeader);