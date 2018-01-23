const express = require('express');

const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers/index');

const GraphQLSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers(),
});

const router = express.Router();

router.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: GraphQLSchema,
}));

router.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  debug: true,
}));

module.exports = router;
