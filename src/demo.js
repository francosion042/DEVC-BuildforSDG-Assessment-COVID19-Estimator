//
// // eslint-disable-next-line no-unused-vars
// const covid19ImEstimator = (data) => {
//   const OP = {
//     data: { ...data }, // the input data you got
//     Im: {}, // your best case estimation
//     SI: {} // your severe case estimation
//   };
//
//   const getHBRT = (totalHospitalBeds, SCRT) => {
//     const useableBedSpace = Math.floor(totalHospitalBeds * 0.35);
//     return useableBedSpace - SCRT;
//   };
//   const ADIP = data.region.avgDailyIncomePopulation;
//   const ADIU = data.region.avgDailyIncomeInUSD;
//   OP.Im.CI = data.reportedCases * 10;
//   OP.SI.CI = data.reportedCases * 50;
//   OP.Im.IRT = OP.Im.CI * 512;
//   OP.SI.IRT = OP.SI.CI * 512;
//   OP.Im.SCRT = Math.floor(OP.Im.IRT * 0.15);
//   OP.SI.SCRT = Math.floor(OP.SI.IRT * 0.15);
//   OP.Im.HBRT = getHBRT(data.totalHospitalBeds, OP.Im.SCRT);
//   OP.SI.HBRT = getHBRT(data.totalHospitalBeds, OP.SI.SCRT);
//   OP.Im.CFIRT = Math.floor(OP.Im.SCRT * 0.05);
//   OP.SI.CFIRT = Math.floor(OP.SI.SCRT * 0.05);
//   OP.Im.CFVRT = Math.floor(OP.Im.SCRT * 0.02);
//   OP.SI.CFVRT = Math.floor(OP.SI.SCRT * 0.02);
//   OP.Im.dollarsInFlight = Math.floor(
//     OP.Im.SCRT * ADIP * ADIU * data.timeToElapse
//   );
//   OP.SI.dollarsInFlight = Math.floor(
//     OP.SI.SCRT * ADIP * ADIU * data.timeToElapse
//   );
//
//   // OP object
//   return {
//     data: { ...data },
//     impact: {
//       currentlyInfected: OP.Im.CI,
//       infectionsByRequestedTime: OP.Im.IRT,
//       severeCasesByRequestedTime: OP.Im.SCRT,
//       hospitalBedsByRequestedTime: OP.Im.HBRT,
//       casesForICUByRequestedTime: OP.Im.CFIRT,
//       casesForVentilatorsByRequestedTime: OP.Im.CFVRT
//     },
//     severeImpact: {
//       currentlyInfected: OP.SI.CI,
//       infectionsByRequestedTime: OP.SI.IRT,
//       severeCasesByRequestedTime: OP.SI.SCRT,
//       hospitalBedsByRequestedTime: OP.SI.HBRT,
//       casesForICUByRequestedTime: OP.SI.CFIRT,
//       casesForVentilatorsByRequestedTime: OP.SI.CFVRT
//     }
//   };
// };
