import { Mongo } from "meteor/mongo";

const moviesCollection = new Mongo.Collection("movies");

Object.assign(moviesCollection, {
  save(movie) {
    const dbMovie = this.findOne({ id: +movie.id });
    if (dbMovie) {
      this.update(dbMovie._id, movie);
      return this.findOne(dbMovie._id);
    }
    return this.findOne(this.insert(movie));
  }
});

export { moviesCollection as MoviesCollection };
