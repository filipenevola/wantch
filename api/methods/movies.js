import { Meteor } from 'meteor/meteor';
import { findMovies } from '../rest/moviesRest';

Meteor.methods({
  moviesSearch(query) {
    return findMovies({ query });
  },
});
