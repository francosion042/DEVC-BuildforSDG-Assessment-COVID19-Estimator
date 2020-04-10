const { Big } = require('big.js');

const calculateEstimatedInfectionsByDays = (periodInDays, currentlyInfected) => {
  const unitPeriod = Math.floor(periodInDays / 3);
  return currentlyInfected * (2 ** unitPeriod);
};

// eslint-disable-next-line consistent-return
const infectionsByRequestedTime = (data, currentlyInfected) => {
  const period = Big(data.timeToElapse);
  let result;
  let periodInDays;
  switch (data.periodType) {
    case 'weeks':
      periodInDays = period * 7;
      result = calculateEstimatedInfectionsByDays(periodInDays, currentlyInfected);
      break;
    case 'months':
      periodInDays = period * 30;
      result = calculateEstimatedInfectionsByDays(periodInDays, currentlyInfected);
      break;
    default:
      result = currentlyInfected * (2 ** Math.floor(period / 3));
      break;
  }
  return result;
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
  const availableBeds = 0.35 * data.totalHospitalBeds;
  return Math.trunc(availableBeds - severeCases);
};
module.exports = { infectionsByRequestedTime, dollarsInFlight, hospitalBedsByRequestedTime };
