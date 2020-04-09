import estimator from './estimator';

const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

describe('Estimator Unit Tests', () => {
  it('should return object with correct keys', () => {
    expect(estimator(data)).toHaveProperty('data');
    expect(estimator(data)).toHaveProperty('impact');
    expect(estimator(data)).toHaveProperty('severeImpact');
  });

  it('should have a data property that holds the input data', () => {
    const result = estimator(data);

    expect(result).toHaveProperty(['data', 'region', 'name'], data.region.name);
    expect(result).toHaveProperty(['data', 'region', 'avgAge'], data.region.avgAge);
    expect(result).toHaveProperty(['data', 'region', 'avgDailyIncomeInUSD'], data.region.avgDailyIncomeInUSD);
    expect(result).toHaveProperty(['data', 'region', 'avgDailyIncomePopulation'], data.region.avgDailyIncomePopulation);
    expect(result).toHaveProperty(['data', 'periodType'], data.periodType);
    expect(result).toHaveProperty(['data', 'timeToElapse'], data.timeToElapse);
    expect(result).toHaveProperty(['data', 'reportedCases'], data.reportedCases);
    expect(result).toHaveProperty(['data', 'population'], data.population);
    expect(result).toHaveProperty(['data', 'totalHospitalBeds'], data.totalHospitalBeds);
  });

  it('should have all required output data', () => {
    const { impact, severeImpact } = estimator(data);

    expect(impact).toHaveProperty('currentlyInfected');
    expect(impact).toHaveProperty('infectionsByRequestedTime');
    expect(impact).toHaveProperty('severeCasesByRequestedTime');
    expect(impact).toHaveProperty('hospitalBedsByRequestedTime');
    expect(impact).toHaveProperty('casesForVentilatorsByRequestedTime');
    expect(impact).toHaveProperty('casesForICUByRequestedTime');
    expect(impact).toHaveProperty('dollarsInFlight');

    expect(severeImpact).toHaveProperty('currentlyInfected');
    expect(severeImpact).toHaveProperty('infectionsByRequestedTime');
    expect(severeImpact).toHaveProperty('severeCasesByRequestedTime');
    expect(severeImpact).toHaveProperty('hospitalBedsByRequestedTime');
    expect(severeImpact).toHaveProperty('casesForVentilatorsByRequestedTime');
    expect(severeImpact).toHaveProperty('casesForICUByRequestedTime');
    expect(severeImpact).toHaveProperty('dollarsInFlight');
  });
});
