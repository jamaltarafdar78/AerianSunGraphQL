const { gql } = require("apollo-server");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  enum CONTENT_TYPE {
    NON_FICTION
    FICTION
  }

  type Book {
    title: String
    author: String
    contentType: CONTENT_TYPE
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getAllBooks: [Book]
    getBooksByContentType(contentType: CONTENT_TYPE!): [Book]
    searchBooks(searchTerm: String!): [Book]
  }
`;

module.exports = typeDefs;
