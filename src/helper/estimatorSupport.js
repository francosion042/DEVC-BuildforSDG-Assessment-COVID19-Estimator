const constants = require('./constants');

/**
 * Function tagged with "Optimization" were abstracted
 * because if the requirements we want it housed in a single place.
 * Also, for easier testing.
 */

const monthInDays = 30;
const weekInDays = 7;
const bestCaseInfectionsMultiplier = 10;
const worstCaseInfectionsMultiplier = 50;
const { days, weeks, months } = constants;

/**
 * Optimization
 *
 * Calculates the best case currently infected by multiplying reported cases by 10
 *
 * @param {number} reportedCases - the number of reportedCases
 */
const getImpactCurrentlyInfected = (reportedCases) =>
  reportedCases * bestCaseInfectionsMultiplier;

/**
 * Optimization
 *
 * Calculates the worst case currently infected by multiplying reported cases by 50
 *
 * @param {number} reportedCases - the number of reportedCases
 */
const getSevereCurrentlyInfected = (reportedCases) =>
  reportedCases * worstCaseInfectionsMultiplier;

/**
 * Calculates the total period in days
 *
 * @param {number} timeToElapse - value for time to elapse
 * @param {string} periodType - value for its unit
 */
const getNormalizedPeriod = (timeToElapse, periodType = days) => {
  switch (periodType) {
    case months:
      return timeToElapse * monthInDays;
    case weeks:
      return timeToElapse * weekInDays;
    default:
      return timeToElapse;
  }
};

/**
 * Calculates the value of infection by requested time.
 * The infections double every three days
 *
 * @param {number} currentlyInfected
 * @param {number} period
 */
const getInfectionsByRequestedTime = (currentlyInfected, period) => {
  const factor = Math.floor(period / 3); // gets the total number of 3 day sets in the period
  return currentlyInfected * 2 ** factor;
};

const getSevereCasesCount = (numberOfInfections) =>
  Math.floor(numberOfInfections * 0.15);

const getRemainingHospitalBedsCount = (numberOfSevereCases, totalBeds) => {
  const availableBeds = totalBeds * 0.35;
  return Math.trunc(availableBeds - numberOfSevereCases);
};

const getCasesForICUCount = (numberOfInfections) =>
  Math.floor(numberOfInfections * 0.05);

const getCasesForVentilatorsCount = (numberOfInfections) =>
  Math.floor(numberOfInfections * 0.02);

const getDollarsInFlight = (
  numberOfInfections,
  avgIncomePopulationPercentage,
  avgDailyIncome,
  period
) => {
  const result =
    numberOfInfections *
    avgIncomePopulationPercentage *
    avgDailyIncome *
    period;
  return Number(result.toFixed(2));
};

const library = {
  getImpactCurrentlyInfected,
  getSevereCurrentlyInfected,
  getNormalizedPeriod,
  getInfectionsByRequestedTime,
  getSevereCasesCount,
  getRemainingHospitalBedsCount,
  getCasesForICUCount,
  getCasesForVentilatorsCount,
  getDollarsInFlight
};

module.exports = library;
