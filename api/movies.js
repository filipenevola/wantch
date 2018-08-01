import { Meteor } from 'meteor/meteor';
import { findMovies } from './moviesRest';
import { MoviesCollection } from '../data/MoviesCollection';

Meteor.methods({
  moviesSearch(query) {
    return findMovies({ query });
  },
  movies() {
    return MoviesCollection.find({}, { sort: { title: 1 } }).fetch();
  },
  movieSave(movie) {
    return MoviesCollection.save(movie);
  },
  movieRemove(movie) {
    return MoviesCollection.remove({id: movie.id});
  },
});
