import { Mongo } from "meteor/mongo";

const moviesCollection = new Mongo.Collection("movies");

Object.assign(moviesCollection, {
  async save(movie) {
    const dbMovie = await this.findOneAsync({ id: +movie.id });
    if (dbMovie) {
      await this.updateAsync(dbMovie._id, movie);
      return this.findOneAsync(dbMovie._id);
    }
    return this.findOneAsync(await this.insertAsync(movie));
  },
});

export { moviesCollection as MoviesCollection };
