const { infectionsByRequestedTime, dollarsInFlight, hospitalBedsByRequestedTime } = require('./helpers');

const severeCasesByRequestedTime = ((cases) => Math.floor(0.15 * cases));

const casesForICUByRequestedTime = ((cases) => Math.floor((5 / 100) * cases));

const casesForVentilatorsByRequestedTime = ((cases) => Math.floor((2 / 100) * cases));


const covid19ImpactEstimator = ((data) => {
  const impact = {};
  const severeImpact = {};
  const { reportedCases } = data;

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  const iCurrentlyInfected = impact.currentlyInfected;
  // eslint-disable-next-line max-len
  impact.infectionsByRequestedTime = infectionsByRequestedTime(data, iCurrentlyInfected);
  const siCurrentlyInfected = severeImpact.currentlyInfected;
  // eslint-disable-next-line max-len
  severeImpact.infectionsByRequestedTime = infectionsByRequestedTime(data, siCurrentlyInfected);

  // eslint-disable-next-line max-len
  impact.severeCasesByRequestedTime = severeCasesByRequestedTime(impact.infectionsByRequestedTime);
  let infections = severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = severeCasesByRequestedTime(infections);

  const siSevereCases = severeImpact.severeCasesByRequestedTime;
  const iSevereCases = impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(data, iSevereCases);
  // eslint-disable-next-line max-len
  severeImpact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(data, siSevereCases);


  // eslint-disable-next-line max-len
  impact.casesForICUByRequestedTime = casesForICUByRequestedTime(impact.infectionsByRequestedTime);
  infections = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = casesForICUByRequestedTime(infections);

  infections = impact.infectionsByRequestedTime;
  // eslint-disable-next-line max-len
  impact.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTime(infections);


  infections = severeImpact.infectionsByRequestedTime;
  // eslint-disable-next-line max-len
  severeImpact.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTime(infections);

  infections = impact.infectionsByRequestedTime;
  impact.dollarsInFlight = dollarsInFlight(data, infections);

  infections = severeImpact.infectionsByRequestedTime;
  severeImpact.dollarsInFlight = dollarsInFlight(data, infections);
  return { data, impact, severeImpact };
});

module.exports = covid19ImpactEstimator;
