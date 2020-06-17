const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer,
  MockList,
} = require("graphql-tools");

const { graphql } = require("graphql");

const typeDefs = require("../src/typedefs_sun");

const sunDataMock = {
  location: "PLYMOUTH",
  date: "17-Jun-20",
  time: "04:40",
  type: "SUNRISE",
};

const testCase = {
  id: "getSunTimesForLocations",
  query: `
    query getSunTimes($from: String!,$to:String!, $locations:[String!]! ){ 
      getSunTimesForLocations(from: $from, to: $to, locations: $locations){
        date
        time
        type
        location
      }
    }
  `,
  variables: { locations: ["PLYMOUTH"], from: "17-Jun-20", to: "18-Jun-20" },
  context: {},
  expected: {
    data: { getSunTimesForLocations: [sunDataMock] },
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
        getSunTimesForLocations: () => new MockList(1),
      }),
      SunData: () => sunDataMock,
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
