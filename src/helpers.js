const fs = require('fs');

const calcluateDays = (periodType, value) => {
  switch (periodType) {
    case 'months':
      return value * 30;

    case 'weeks':
      return value * 7;

    default:
      return value;
  }
};

const availableBeds = (
  totalHospitalBeds,
  severeCasesByRequestedTime
) => {
  const occupied = 0.65 * totalHospitalBeds;
  const available = totalHospitalBeds - occupied;
  return Math.trunc(available - severeCasesByRequestedTime);
};

// eslint-disable-next-line max-len
const infectionProjections = (currentlyInfected, days) => currentlyInfected * (2 ** Math.floor(days / 3));

const moneyLost = (
  infectionsByRequestedTime,
  percentageIncome,
  avgIncome,
  days
) => {
  const estimatedLoss = (infectionsByRequestedTime * percentageIncome * avgIncome) / days;
  return Math.trunc(estimatedLoss);
};

const impactEstimator = (
  {
    reportedCases, totalHospitalBeds, periodType, timeToElapse, region
  },
  reportedCasesMultiplyer
) => {
  const numberOfDays = calcluateDays(periodType, timeToElapse);
  const currentlyInfected = reportedCases * reportedCasesMultiplyer;
  const infectionsByRequestedTime = infectionProjections(
    currentlyInfected,
    numberOfDays
  );
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);
  const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime: availableBeds(
      totalHospitalBeds,
      severeCasesByRequestedTime
    ),
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight: moneyLost(
      infectionsByRequestedTime,
      region.avgDailyIncomePopulation,
      region.avgDailyIncomeInUSD,
      numberOfDays
    )
  };
};

const getTimeInMilliseconds = (startTime) => {
  const NS_PER_SEC = 1e9; // time in nano seconds
  const NS_TO_MS = 1e6; // time in milli seconds
  const timeDifference = process.hrtime(startTime);
  return (timeDifference[0] * NS_PER_SEC + timeDifference[1]) / NS_TO_MS;
};

const saveToFile = (data, filename) => {
  fs.appendFile(filename, `${data}\n`, (err) => {
    if (err) {
      throw new Error('The data could not be saved');
    }
  });
};

module.exports = { impactEstimator, getTimeInMilliseconds, saveToFile };
