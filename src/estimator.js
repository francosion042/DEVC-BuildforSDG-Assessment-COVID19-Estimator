const { impactEstimator } = require('./helpers');

const covid19ImpactEstimator = ((data) => {
  const impact = impactEstimator({ ...data }, 10);
  const severeImpact = impactEstimator({ ...data }, 50);
  return { data, impact, severeImpact };
});

module.exports = covid19ImpactEstimator;
