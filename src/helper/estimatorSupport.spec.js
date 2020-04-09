import library from './estimatorSupport';

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

describe('Support Functions Unit Tests', () => {
  it('should return correct "currentlyInfected"', () => {
    expect(getImpactCurrentlyInfected(10)).toEqual(100);
    expect(getImpactCurrentlyInfected(23)).toEqual(230);
    expect(getSevereCurrentlyInfected(12)).toEqual(600);
    expect(getSevereCurrentlyInfected(30)).toEqual(1500);
  });

  it('should return normalized periods', () => {
    expect(getNormalizedPeriod(21, 'days')).toEqual(21);
    expect(getNormalizedPeriod(4, 'weeks')).toEqual(28);
    expect(getNormalizedPeriod(2, 'months')).toEqual(60);
  });

  it('should return correct "infectionsByRequestedTime"', () => {
    expect(getInfectionsByRequestedTime(100, 21)).toEqual(12800);
    expect(getInfectionsByRequestedTime(100, 23)).toEqual(12800);
    expect(getInfectionsByRequestedTime(100, 25)).toEqual(25600);
  });

  it('should return correct number of "severeCases"', () => {
    expect(getSevereCasesCount(12800)).toEqual(1920);
    expect(getSevereCasesCount(12832)).toEqual(1924);
    expect(getSevereCasesCount(12828)).toEqual(1924);
  });

  it('should return correct number of hospital beds', () => {
    expect(getRemainingHospitalBedsCount(12800, 30000)).toEqual(-2300);
    expect(getRemainingHospitalBedsCount(1280, 30000)).toEqual(9220);
  });

  it('should return correct number of cases for ICU', () => {
    expect(getCasesForICUCount(12800)).toEqual(640);
  });

  it('should return correct number of cases for ventilators', () => {
    expect(getCasesForVentilatorsCount(12800)).toEqual(256);
  });

  it('should return the correct value of money lost', () => {
    expect(getDollarsInFlight(12800, 0.71, 5, 30)).toEqual(1363200);
  });
});
