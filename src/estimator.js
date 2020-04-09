// const { Big } = require('big.js');

const { infectionsByRequestedTime, dollarsInFlight, hospitalBedsByRequestedTime } = require('./helpers');

const severeCasesByRequestedTime = ((time) => time * 0.15);

const casesForICUByRequestedTime = ((time) => time * 0.05);

const casesForVentilatorsByRequestedTime = ((time) => time * 0.02);


const covid19ImpactEstimator = ((data) => {
  const impact = {};
  const severeImpact = {};
  const { reportedCases } = data;

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  const iCurrentlyInfected = impact.currentlyInfected;
  // eslint-disable-next-line max-len
  impact.infectionsByRequestedTime = Math.floor(infectionsByRequestedTime(data, iCurrentlyInfected));
  const siCurrentlyInfected = severeImpact.currentlyInfected;
  // eslint-disable-next-line max-len
  severeImpact.infectionsByRequestedTime = Math.floor(infectionsByRequestedTime(data, siCurrentlyInfected));

  // eslint-disable-next-line max-len
  impact.severeCasesByRequestedTime = Math.floor(severeCasesByRequestedTime(impact.infectionsByRequestedTime));
  let infections = severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = Math.floor(severeCasesByRequestedTime(infections));

  const siSevereCases = severeImpact.severeCasesByRequestedTime;
  const iSevereCases = impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.floor(hospitalBedsByRequestedTime(data, iSevereCases));
  // eslint-disable-next-line max-len
  severeImpact.hospitalBedsByRequestedTime = Math.floor(hospitalBedsByRequestedTime(data, siSevereCases));


  // eslint-disable-next-line max-len
  impact.casesForICUByRequestedTime = Math.floor(casesForICUByRequestedTime(impact.infectionsByRequestedTime));
  infections = Math.floor(severeImpact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.floor(casesForICUByRequestedTime(infections));

  infections = Math.floor(impact.infectionsByRequestedTime);
  // eslint-disable-next-line max-len
  impact.casesForVentilatorsByRequestedTime = Math.floor(casesForVentilatorsByRequestedTime(infections));


  infections = Math.floor(severeImpact.infectionsByRequestedTime);
  // eslint-disable-next-line max-len
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(casesForVentilatorsByRequestedTime(infections));

  infections = impact.infectionsByRequestedTime;
  impact.dollarsInFlight = dollarsInFlight(data, infections);

  infections = severeImpact.infectionsByRequestedTime;
  severeImpact.dollarsInFlight = dollarsInFlight(data, infections);
  return { data, impact, severeImpact };
});

module.exports = covid19ImpactEstimator;
