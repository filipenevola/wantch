import { Meteor } from "meteor/meteor";
import { searchMovies, popularMovies } from "./moviesRest";
import { MoviesCollection } from "../data/MoviesCollection";

Meteor.methods({
  moviesSearch(query) {
    return searchMovies({ query });
  },
  moviesPopular() {
    return popularMovies();
  },
  movies() {
    return MoviesCollection.find({}, { sort: { title: 1 } }).fetchAsync();
  },
  movieSave(movie) {
    return  MoviesCollection.save(movie);
  },
  movieRemove(movie) {
    return MoviesCollection.removeAsync({ id: movie.id });
  },
});
