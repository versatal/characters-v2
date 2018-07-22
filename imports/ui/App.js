import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';

import Authenticated from './pages/Authenticated';
import Public from './pages/Public';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';

const App = appProps => (
  <Router>
    <Switch>
      <Public exact path="/" component={Login} {...appProps}/>
      <Public path="/signup" component={Signup} {...appProps}/>
      <Authenticated exact path="/admin" component={Admin} {...appProps}/>
      <Authenticated exact path="/admin/:id" component={Admin} {...appProps}/>
      <Authenticated exact path="/dashboard" component={Dashboard} {...appProps}/>
      <Authenticated exact path="/dashboard/:id" component={Dashboard} {...appProps}/>
    </Switch>
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