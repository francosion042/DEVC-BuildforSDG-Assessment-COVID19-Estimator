const hospitalBedsByRequestedTime = (data, severeCases) => {
  const availableBeds = data.totalHospitalBeds * 0.35;
  return availableBeds - severeCases;
};
module.exports = hospitalBedsByRequestedTime;
