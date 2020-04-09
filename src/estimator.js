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
  Math.floor(infections = severeImpact.infectionsByRequestedTime);

  // eslint-disable-next-line max-len
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(casesForVentilatorsByRequestedTime(infections));

  infections = Math.floor(impact.infectionsByRequestedTime);
  impact.dollarsInFlight = Number(dollarsInFlight(data, infections));
  infections = Math.floor(severeImpact.infectionsByRequestedTime);
  severeImpact.dollarsInFlight = Number(dollarsInFlight(data, infections));
  return { data, impact, severeImpact };
});

module.exports = covid19ImpactEstimator;
