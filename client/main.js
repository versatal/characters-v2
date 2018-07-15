import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import React from 'react';

import './main.html';

import App from '../imports/ui/App';
import '../imports/startup/simple-schema-configuration.js';

const isAuthenticated = !!Meteor.userId();
console.log(isAuthenticated);

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});