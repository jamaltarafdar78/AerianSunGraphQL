const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer,
  MockList,
} = require("graphql-tools");

const { graphql } = require("graphql");

const typeDefs = require("../src/typeDefs");

const testCase = {
  id: "getAllBooks",
  query: `
    query {
      getAllBooks {
         title
      }
    }
  `,
  variables: {},
  context: {},
  expected: {
    data: { getAllBooks: [{ title: "A book" }] },
  },
};

describe("Schema", () => {
  const mockSchema = makeExecutableSchema({ typeDefs });
  const cases = [testCase];

  // Here we specify the return payloads of mocked types
  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Query: () => ({
        getAllBooks: () => new MockList(1),
      }),
      Book: () => ({
        title: "A book",
        author: "An author",
        contentType: "FICTION",
      }),
    },
  });

  test("has valid type definitions", async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);

      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });

  cases.forEach((obj) => {
    const { id, query, variables, context: ctx, expected } = obj;

    test(`query: ${id}`, async () => {
      return await expect(
        graphql(mockSchema, query, null, { ctx }, variables)
      ).resolves.toEqual(expected);
    });
  });
});
