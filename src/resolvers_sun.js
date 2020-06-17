const getDateNumeral = (date) => parseInt(date.split("-")[0], 10);

const resolvers = {
  Query: {
    getSunTimesForLocations: (_, { from, to, locations }, { dataSources }) => {
      const fromDateNumeral = getDateNumeral(from);
      const toDateNumeral = getDateNumeral(to);

      const sunDataArray = [];

      locations.forEach((location) => {
        const dataLocation = dataSources.sunData[location];

        for (let i = fromDateNumeral; i < toDateNumeral; i++) {
          const currentDate = `${i}-Jun-20`;
          const sunDataForDate = dataLocation[currentDate];

          sunDataForDate.forEach((element) => {
            const flatten = {
              location,
              date: currentDate,
              time: element.time,
              type: element.type,
            };

            sunDataArray.push(flatten);
          });
        }
      });

      return sunDataArray;
    },
  },
};

module.exports = resolvers;
