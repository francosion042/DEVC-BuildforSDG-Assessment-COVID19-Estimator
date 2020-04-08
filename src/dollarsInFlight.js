const dollarsInFlight = (data, infections) => {
  let totalDollars;
  let timeInDays;
  const { avgDailyIncomePopulation } = data.region;
  const { avgDailyIncomeInUSD } = data.region;
  switch (data.periodType) {
    case 'weeks':
      timeInDays = (data.timeToElapse * 7).toFixed(2);
      totalDollars = infections * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeInDays;
      break;
    case 'months':
      timeInDays = (data.timeToElapse * 30).toFixed(2);
      totalDollars = infections * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeInDays;
      break;
    default:
      timeInDays = data.timeToElapse.toFixed(2);
      totalDollars = infections * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeInDays;
      break;
  }
  return totalDollars;
};

module.exports = dollarsInFlight;
