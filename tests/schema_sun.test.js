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
  id: "getSunTimesForLocation",
  query: `
    query getSunTimesForLocation(from: String, to: String, location:String) {
      getSunTimesForLocation($from, $to, $location) {
         location, 
         date,
         time,
         type,
      }
    }
  `,
  variables: { location: "PLYMOUTH", from: "17-Jun-20", to: "18-Jun-20" },
  context: {},
  expected: {
    data: { getSunTimesForLocation: [sunDataMock] },
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
        getSunTimesForLocation: () => new MockList(1),
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
