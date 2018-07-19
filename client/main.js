import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Session } from 'meteor/session';

import './main.html';

import App from '../imports/ui/App';
import '../imports/startup/simple-schema-configuration.js';

const isAuthenticated = !!Meteor.userId();

Tracker.autorun(() => {
  const selectedCharacterId = Session.get('selectedCharacterId');
  Session.set('isNavOpen', false);

  if (selectedCharacterId) {
    <Redirect to={`/dashboard/${selectedCharacterId}`} />;
  }
});

Tracker.autorun(() => {
  const selectedFeatId = Session.get('selectedFeatId');
  Session.set('isNavOpen', false);

  if (selectedFeatId) {
    <Redirect to={`/admin/${selectedFeatId}`} />;
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen)
});

Meteor.startup(() => {
  Session.set('selectedFeatId', undefined);
  Session.set('selectedCharacterId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(<App />, document.getElementById('app'));
});