import { makeExecutableSchema } from 'graphql-tools';
import { setup } from 'meteor/swydo:ddp-apollo';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

setup({
  schema,
});
