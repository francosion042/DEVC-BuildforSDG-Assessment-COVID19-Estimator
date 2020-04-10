const fs = require('fs');
const path = require('path');

const jsontoxml = require('jsontoxml');
const covid19ImpactEstimator = require('./estimator');


const routes = (app) => {
  app.get('/', (request, response) => response.status(200).json({
    success: true,
    message: 'Welcome to the Covid-19 Estimator API'
  }));

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

  app.get('/api/v1/on-covid-19/logs', (request, response) => {
    try {
      const filePath = path.join(__dirname, 'request_logs.txt');
      const data = fs.readFileSync(filePath, 'utf8');
      response.status(200).send(data);
    } catch (error) {
      throw new Error('Sorry, there was an issue reading the logs try');
    }
  });

  app.delete('/api/v1/on-covid-19/logs', (request, response) => {
    try {
      const filePath = path.join(__dirname, 'request_logs.txt');
      fs.unlinkSync(filePath);
      response.status(201).send({
        message: 'logs deleted'
      });
    } catch (error) {
      throw new Error('Sorry, there was an issue deleting the logs try');
    }
  });
};
module.exports = routes;
