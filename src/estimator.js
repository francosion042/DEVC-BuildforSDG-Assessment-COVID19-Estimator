const percentage = require('./percentageModule');

const covid19ImpactEstimator = (data) => {
  const cases = data.reportedCases;
  // variable to store the reported cases multiplied by either 10 or 50
  const currentlyInfectedOne = cases * 10;
  const currentlyInfectedTwo = cases * 50;

  const infectionsByRequestedTimeOne = currentlyInfectedOne * 512;
  const infectionsByRequestedTimeTwo = currentlyInfectedTwo * 512;

  const severeCasesByRequestedTimeOne = percentage(
    infectionsByRequestedTimeOne,
    15
  );
  const severeCasesByRequestedTimeTwo = percentage(
    infectionsByRequestedTimeTwo,
    15
  );

  const output = {
    data: {}, // the input data you got
    impact: {
      currentlyInfected: currentlyInfectedOne,
      infectionsByRequestedTime: infectionsByRequestedTimeOne,
      severeCasesByRequestedTime: severeCasesByRequestedTimeOne
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: currentlyInfectedTwo,
      infectionsByRequestedTime: infectionsByRequestedTimeTwo,
      severeCasesByRequestedTime: severeCasesByRequestedTimeTwo
    } // your severe case estimation
  };
  return output;
};

export default covid19ImpactEstimator;
