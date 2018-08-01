import { findMovies } from '../rest/moviesRest';

export const resolvers = {
  Query: {
    async searchMovies(obj, { query }) {
      return [];
      // findMovies({ query }).then(result => {
      //   const data = JSON.parse(result);
      //   if (!data || !data.results) {
      //     return;
      //   }
      //   const { results: movies } = data;
      //   return movies;
      // });
    },
  },
  Movie: {
    async voteAverage({ vote_average }) {
      return vote_average;
    },
  },
};
