export const typeDefs = `
  type Query {
    searchMovies(query: String!): [Movie]
  }
  
  type Movie {
    id: Int!
    title: String!
    voteAverage: Float
  }
`;
