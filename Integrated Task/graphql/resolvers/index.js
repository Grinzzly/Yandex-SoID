const GraphQLDate = require('graphql-date');

const query = require('./query');
const mutation = require('./mutation');
const event = require('./event');

module.exports = function resolvers() {
  return {
    Query: query,
    Mutation: mutation,
    Event: event,
    Date: GraphQLDate,
  };
};
