import { Meteor } from 'meteor/meteor';
import { searchMovies, popularMovies } from './moviesRest';
import { MoviesCollection } from '../data/MoviesCollection';

Meteor.methods({
  moviesSearch(query) {
    return searchMovies({ query });
  },
  moviesPopular() {
    return popularMovies();
  },
  movies() {
    return MoviesCollection.find({}, { sort: { title: 1 } }).fetch();
  },
  movieSave(movie) {
    return MoviesCollection.save(movie);
  },
  movieRemove(movie) {
    return MoviesCollection.remove({ id: movie.id });
  },
});
