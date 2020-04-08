import Big from 'big.js';
import infectionsByRequestedTime from './infectionsByRequestedTime';

const severeCasesByRequestedTime = ((time) => Math.round(time * 0.15)
);

const casesForICUByRequestedTime = ((time) => time * 0.05
);

const casesForVentilatorsByRequestedTime = ((time) => time * 0.02
);

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
  return totalDollars;
};

const hospitalBedsByRequestedTime = (data, severeCases) => {
  const availableBeds = data.totalHospitalBeds * 0.35;
  return availableBeds - severeCases;
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

export default covid19ImpactEstimator;


// const percentage = require('./percentageModule');
//
// const covid19ImpactEstimator = (data) => {
//   const cases = data.reportedCases;
//   // variable to store the reported cases multiplied by either 10 or 50
//   const currentlyInfectedOne = cases * 10;
//   const currentlyInfectedTwo = cases * 50;
//
//   const infectionsByRequestedTimeOne = currentlyInfectedOne * 512;
//   const infectionsByRequestedTimeTwo = currentlyInfectedTwo * 512;
//
//   const severeCasesByRequestedTimeOne = percentage(
//     infectionsByRequestedTimeOne,
//     15
//   );
//   const severeCasesByRequestedTimeTwo = percentage(
//     infectionsByRequestedTimeTwo,
//     15
//   );
//
//   const output = {
//     data: {}, // the input data you got
//     impact: {
//       currentlyInfected: currentlyInfectedOne,
//       infectionsByRequestedTime: infectionsByRequestedTimeOne,
//       severeCasesByRequestedTime: severeCasesByRequestedTimeOne
//     }, // your best case estimation
//     severeImpact: {
//       currentlyInfected: currentlyInfectedTwo,
//       infectionsByRequestedTime: infectionsByRequestedTimeTwo,
//       severeCasesByRequestedTime: severeCasesByRequestedTimeTwo
//     } // your severe case estimation
//   };
//   return output;
// };
//
// export default covid19ImpactEstimator;
