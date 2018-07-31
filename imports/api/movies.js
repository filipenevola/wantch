import { Meteor } from 'meteor/meteor';
import { findMovies } from './moviesRest';

Meteor.methods({
  moviesSearch(query) {
    return findMovies({ query });
  },
});
