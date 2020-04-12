const fs = require('fs');
const path = require('path');
const Xml2js = require('xml2js');

const covid19ImpactEstimator = require('./estimator');

const routes = (app) => {
  app.get('/api/v1/on-covid-19', (request, response) => response.status(200).json({
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

  app.post('/api/v1/on-covid-19/xml', (request, response) => {
    const data = request.body;
    const estimation = covid19ImpactEstimator(data);
    const builder = new Xml2js.Builder();
    response.header('Content-Type', 'application/xml; charset=UTF-8');
    response.status(200).send(builder.buildObject(estimation));
  });

  app.get('/api/v1/on-covid-19/logs', (request, response) => {
    const filePath = path.join(__dirname, 'request_logs.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) console.log(err);
      response.header('Content-Type', 'text/plain; charset=UTF-8');
      response.status(200).send(data);
    });
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
