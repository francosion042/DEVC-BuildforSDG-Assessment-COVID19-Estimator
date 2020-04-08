import Big from 'big.js';

const infectionsByRequestedTime = (data, currentlyInfected) => {
  let infections = null;
  const period = Big(data.timeToElapse);
  let periodInDays;
  let unitPeriod;
  switch (data.periodType) {
    case 'weeks':
      periodInDays = period * 7;
      unitPeriod = Math.round(periodInDays / 3);
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
    case 'months':
      periodInDays = period * 30;
      unitPeriod = Math.round(periodInDays / 3);
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
    default:
      unitPeriod = Math.round(period / 3);
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
  }
  return infections;
};

export default infectionsByRequestedTime;