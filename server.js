const express = require('express');
const bodyParser = require('body-parser');
const jsontoxml = require('jsontoxml');

const covid19ImpactEstimator = require('./src/estimator');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.post('/api/v1/on-covid-19', (req, res) => {
  const data = {};
  data.region = req.body.region;
  data.periodType = req.body.periodType;
  data.timeToElapse = req.body.timeToElapse;
  data.reportedCases = req.body.reportedCases;
  data.population = req.body.population;
  data.totalHospitalBeds = req.body.totalHospitalBeds;
  res.send(covid19ImpactEstimator(data));
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  const data = {};
  data.region = req.body.region;
  data.periodType = req.body.periodType;
  data.timeToElapse = req.body.timeToElapse;
  data.reportedCases = req.body.reportedCases;
  data.population = req.body.population;
  data.totalHospitalBeds = req.body.totalHospitalBeds;
  res.send(covid19ImpactEstimator(data));
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  const data = {};
  data.region = req.body.region;
  data.periodType = req.body.periodType;
  data.timeToElapse = req.body.timeToElapse;
  data.reportedCases = req.body.reportedCases;
  data.population = req.body.population;
  data.totalHospitalBeds = req.body.totalHospitalBeds;

  res.send(jsontoxml(covid19ImpactEstimator(data)));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
