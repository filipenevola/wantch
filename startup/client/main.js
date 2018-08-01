import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import ApolloClient from 'apollo-client';
import { DDPLink } from 'meteor/swydo:ddp-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './main.css';
import { App } from '../../ui/App';

export const apolloClient = new ApolloClient({
  link: new DDPLink(),
  cache: new InMemoryCache(),
});

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});
