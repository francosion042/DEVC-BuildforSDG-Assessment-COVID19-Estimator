/**
 * Keep generic string or number constants in a file and export.
 * Solves any string based inconsistencies in application code or tests.
 */

const days = 'days';
const weeks = 'weeks';
const months = 'months';

const getLogDate = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

const nanosecondsInASecond = 1e9;
const nanosecondsInAMillisecond = 1e6;

module.exports = {
  days,
  weeks,
  months,
  nanosecondsInASecond,
  nanosecondsInAMillisecond,
  getLogDate
};
