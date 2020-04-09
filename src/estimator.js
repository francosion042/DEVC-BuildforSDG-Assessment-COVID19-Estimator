// Renamed variables due to linting restrictions

const library = require('./helper/estimatorSupport');

const {
  getImpactCurrentlyInfected,
  getSevereCurrentlyInfected,
  getNormalizedPeriod,
  getInfectionsByRequestedTime,
  getSevereCasesCount,
  getRemainingHospitalBedsCount,
  getCasesForICUCount,
  getCasesForVentilatorsCount,
  getDollarsInFlight
} = library;

const covid19ImpactEstimator = (data) => {
  const result = {
    impact: {},
    severeImpact: {}
  };

  // Express period in days
  const period = getNormalizedPeriod(data.timeToElapse, data.periodType);

  // Add the input data
  result.data = data;

  // Add currently Infected
  result.impact.currentlyInfected = getImpactCurrentlyInfected(
    data.reportedCases
  );
  result.severeImpact.currentlyInfected = getSevereCurrentlyInfected(
    data.reportedCases
  );

  // Add infections by requested time
  result.impact.infectionsByRequestedTime = getInfectionsByRequestedTime(
    result.impact.currentlyInfected,
    period
  );

  result.severeImpact.infectionsByRequestedTime = getInfectionsByRequestedTime(
    result.severeImpact.currentlyInfected,
    period
  );

  // Add severe cases by requested time
  result.impact.severeCasesByRequestedTime = getSevereCasesCount(
    result.impact.infectionsByRequestedTime
  );

  result.severeImpact.severeCasesByRequestedTime = getSevereCasesCount(
    result.severeImpact.infectionsByRequestedTime
  );

  // Add hospital beds by requested time
  result.impact.hospitalBedsByRequestedTime = getRemainingHospitalBedsCount(
    result.impact.severeCasesByRequestedTime,
    data.totalHospitalBeds
  );

  result.severeImpact.hospitalBedsByRequestedTime = getRemainingHospitalBedsCount(
    result.severeImpact.severeCasesByRequestedTime,
    data.totalHospitalBeds
  );

  // Add cases for ICU by requested time
  result.impact.casesForICUByRequestedTime = getCasesForICUCount(
    result.impact.infectionsByRequestedTime
  );

  result.severeImpact.casesForICUByRequestedTime = getCasesForICUCount(
    result.severeImpact.infectionsByRequestedTime
  );

  // Add cases for ventilators by requested time
  result.impact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsCount(
    result.impact.infectionsByRequestedTime
  );

  result.severeImpact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsCount(
    result.severeImpact.infectionsByRequestedTime
  );

  // Add money lost over period of 30 days
  result.impact.dollarsInFlight = getDollarsInFlight(
    result.impact.infectionsByRequestedTime,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    period
  );

  result.severeImpact.dollarsInFlight = getDollarsInFlight(
    result.severeImpact.infectionsByRequestedTime,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    period
  );

  return result;
};

module.exports = covid19ImpactEstimator;
