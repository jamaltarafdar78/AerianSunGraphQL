const resolvers = {
  Query: {
    getAllBooks: (_, __, { dataSources }) => dataSources.books,
    getBooksByContentType: (_, { contentType }, { dataSources }) =>
      dataSources.books.filter((book) => book.contentType === contentType),
    searchBooks: (_, { searchTerm }, { dataSources }) =>
      dataSources.books.filter((book) =>
        String(`${book.title} ${book.author}`)
          .toLowerCase()
          .includes(String(searchTerm).toLowerCase())
      ),
  },
};

module.exports = resolvers;
