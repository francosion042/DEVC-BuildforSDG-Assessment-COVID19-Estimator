const calculateEstimatedInfectionsByDays = (periodInDays, currentlyInfected) => {
  const unitPeriod = periodInDays / 3;
  return currentlyInfected * (2 ** unitPeriod);
};

// eslint-disable-next-line consistent-return
const infectionsByRequestedTime = (data, currentlyInfected) => {
  const period = data.timeToElapse;
  let periodInDays;
  switch (data.periodType) {
    case 'weeks':
      periodInDays = period * 7;
      return calculateEstimatedInfectionsByDays(periodInDays, currentlyInfected);
    case 'months':
      periodInDays = period * 30;
      return calculateEstimatedInfectionsByDays(periodInDays, currentlyInfected);
    default:
      return currentlyInfected * (2 ** period / 3);
  }
};

const dollarsInFlight = (data, infections) => {
  let totalDollars;
  let timeInDays;
  const { avgDailyIncomePopulation } = data.region;
  const { avgDailyIncomeInUSD } = data.region;
  switch (data.periodType) {
    case 'weeks':
      timeInDays = data.timeToElapse * 7;
      totalDollars = infections * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeInDays;
      break;
    case 'months':
      timeInDays = data.timeToElapse * 30;
      totalDollars = infections * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeInDays;
      break;
    default:
      timeInDays = data.timeToElapse;
      totalDollars = infections * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeInDays;
      break;
  }
  return Number(totalDollars.toFixed(2));
};

const hospitalBedsByRequestedTime = (data, severeCases) => {
  const availableBeds = data.totalHospitalBeds * 0.35;
  return Math.trunc(availableBeds - severeCases);
};
module.exports = { infectionsByRequestedTime, dollarsInFlight, hospitalBedsByRequestedTime };
