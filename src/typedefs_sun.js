const { gql } = require("apollo-server");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  enum DATA_TYPE {
    SUNRISE
    SUNSET
  }

  type SunData {
    location: String
    date: String
    time: String
    type: DATA_TYPE
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getSunTimesForLocations(
      from: String!
      to: String!
      locations: [String!]!
    ): [SunData]
    # getSunTimesForLocationToday(location: String!, type: DATA_TYPE): [SunData]
  }
`;

module.exports = typeDefs;
