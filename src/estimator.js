const { impactEstimator } = require('./helpers');

const covid19ImpactEstimator = (data) => ({
  data,
  impact: impactEstimator({ ...data }, 10),
  severeImpact: impactEstimator({ ...data }, 50)
});

const formatAPIResponse = (estimateValues) => covid19ImpactEstimator(estimateValues);


const jsonResponse = (request, response) => {
  const result = request.body;
  response.status(200).send(formatAPIResponse(result));
};


module.exports = { covid19ImpactEstimator, formatAPIResponse, jsonResponse };
