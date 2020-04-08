const { Big } = require('big.js');

const infectionsByRequestedTime = require('./infectionsByRequestedTime');

// const dollarsInFlight = require('./dollarsInFlight');

const hospitalBedsByRequestedTime = require('./hospitalBedsByRequestedTime');

const severeCasesByRequestedTime = ((time) => Math.round(time * 0.15));

const casesForICUByRequestedTime = ((time) => time * 0.05);

const casesForVentilatorsByRequestedTime = ((time) => time * 0.02);

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

const covid19ImpactEstimator = ((data) => {
  const impact = {};
  const severeImpact = {};
  const reportedCases = Big(data.reportedCases);

  impact.currentlyInfected = reportedCases * Big(10);
  severeImpact.currentlyInfected = reportedCases * Big(50);

  const iCurrentlyInfected = Big(impact.currentlyInfected);
  impact.infectionsByRequestedTime = infectionsByRequestedTime(data, iCurrentlyInfected);
  const siCurrentlyInfected = Big(severeImpact.currentlyInfected);
  severeImpact.infectionsByRequestedTime = infectionsByRequestedTime(data, siCurrentlyInfected);

  impact.severeCasesByRequestedTime = severeCasesByRequestedTime(impact.infectionsByRequestedTime);
  let infections = severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = severeCasesByRequestedTime(infections);

  const siSevereCases = severeImpact.severeCasesByRequestedTime;
  const iSevereCases = impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(data, iSevereCases);
  severeImpact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(data, siSevereCases);

  impact.casesForICUByRequestedTime = casesForICUByRequestedTime(impact.infectionsByRequestedTime);
  infections = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = casesForICUByRequestedTime(infections);

  infections = impact.infectionsByRequestedTime;
  impact.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTime(infections);
  infections = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTime(infections);

  infections = impact.infectionsByRequestedTime;
  impact.dollarsInFlight = dollarsInFlight(data, infections);
  infections = severeImpact.infectionsByRequestedTime;
  severeImpact.dollarsInFlight = dollarsInFlight(data, infections);
  return { data, impact, severeImpact };
});

module.exports = covid19ImpactEstimator;
