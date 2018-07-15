import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';

import Authenticated from './pages/Authenticated';
import Public from './pages/Public';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Index from './pages/Index';

const App = appProps => (
  <Router>
    <div className="page-content">
      <Switch>
        <Route path="/" exact component={Index}/>
        <Public path="/login" component={Login} {...appProps}/>
        <Public path="/signup" component={Signup} {...appProps}/>
        <Authenticated exact path="/dashboard" component={Dashboard} {...appProps}/>
      </Switch>
    </div>
  </Router>
)

const composer = (props, onData) => {
  const loggingIn = Meteor.loggingIn();
  onData(null, {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
};

export default composeWithTracker(composer)(App)