const getDateNumeral = (date) => parseInt(date.split("-")[0], 10);

const resolvers = {
  Query: {
    getSunTimesForLocation: (_, { from, to, location }, { dataSources }) => {
      const dataLocation = dataSources.sunData[location];

      const fromDateNumeral = getDateNumeral(from);
      const toDateNumeral = getDateNumeral(to);

      const sunDataArray = [];

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
      return sunDataArray;
    },
  },
};

module.exports = resolvers;
