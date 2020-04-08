const { Big } = require('big.js');

const infectionsByRequestedTime = (data, currentlyInfected) => {
  let infections = null;
  const period = Big(data.timeToElapse);
  let periodInDays;
  let unitPeriod;
  switch (data.periodType) {
    case 'weeks':
      periodInDays = period * 7;
      unitPeriod = Math.floor(periodInDays / 3);
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
    case 'months':
      periodInDays = period * 30;
      unitPeriod = Math.floor(periodInDays / 3);
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
    default:
      unitPeriod = Math.floor(period / 3);
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
  }
  return infections;
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
  return parseFloat(totalDollars.toFixed(2));
};

const hospitalBedsByRequestedTime = (data, severeCases) => {
  const availableBeds = data.totalHospitalBeds * 0.35;
  return availableBeds - severeCases;
};
module.exports = { infectionsByRequestedTime, dollarsInFlight, hospitalBedsByRequestedTime };
