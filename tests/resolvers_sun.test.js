const resolverSunData = require("../src/resolvers_sun");
const sunData = require("../src/datastore_sun");
const { isType } = require("graphql");
const { TestScheduler } = require("jest");

describe("Query", () => {
  const { Query } = resolverSunData;

  describe("getSunTimesForLocations", () => {
    const { getSunTimesForLocations } = Query;

    describe("when single location where data exists", () => {
      const location = "PLYMOUTH";

      test("then only data for that location is return", () => {
        const results = getSunTimesForLocations(
          {},
          { from: "17-Jun-20", to: "18-Jun-20", locations: [location] },
          {
            dataSources: {
              sunData,
            },
          }
        );

        expect(results.length).not.toBe(0);
        expect(results.filter((r) => r.location !== location).length).toBe(0);
      });
    });

    describe("when multiples locations where data exists", () => {
      const locations = ["PLYMOUTH", "LONDON"];

      test("then only data for those locations are return", () => {
        const results = getSunTimesForLocations(
          {},
          { from: "17-Jun-20", to: "18-Jun-20", locations },
          {
            dataSources: {
              sunData,
            },
          }
        );

        expect(results.length).not.toBe(0);
        expect(
          results.filter(
            (r) => !locations.some((inLocations) => r.location !== inLocations)
          ).length
        ).toBe(0);
      });
    });
  });
});
