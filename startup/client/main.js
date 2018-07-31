import React from 'react';
import { render } from 'react-dom';

import App from '../../client/ui/App';
import './main.css';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});
