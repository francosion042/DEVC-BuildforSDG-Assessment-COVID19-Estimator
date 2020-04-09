// const { Big } = require('big.js');

const { infectionsByRequestedTime, dollarsInFlight, hospitalBedsByRequestedTime } = require('./helpers');

const severeCasesByRequestedTime = ((time) => Math.floor(time * 0.15));

const casesForICUByRequestedTime = ((time) => time * 0.05);

const casesForVentilatorsByRequestedTime = ((time) => time * 0.02);


const covid19ImpactEstimator = ((data) => {
  const impact = {};
  const severeImpact = {};
  const { reportedCases } = data;

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  const iCurrentlyInfected = impact.currentlyInfected;
  impact.infectionsByRequestedTime = infectionsByRequestedTime(data, iCurrentlyInfected);
  const siCurrentlyInfected = severeImpact.currentlyInfected;
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
  impact.dollarsInFlight = Number(dollarsInFlight(data, infections));
  infections = severeImpact.infectionsByRequestedTime;
  severeImpact.dollarsInFlight = Number(dollarsInFlight(data, infections));
  return { data, impact, severeImpact };
});

module.exports = covid19ImpactEstimator;
