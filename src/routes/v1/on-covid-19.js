const fs = require('fs');
const express = require('express');
const constants = require('../../helper/constants');
const Estimator = require('../../lib/estimator');
const covid19ImpactEstimator = require('../../estimator');

const { getLogDate } = constants;
const router = express.Router();

const jsonHandler = (req, res) => {
  const estimatorOutput = new Estimator(
    covid19ImpactEstimator,
    req.body
  ).toJSON();
  res.json(estimatorOutput);
};
router.post('/', jsonHandler);

router.post('/json', jsonHandler);

router.post('/xml', (req, res) => {
  const estimatorOutput = new Estimator(
    covid19ImpactEstimator,
    req.body
  ).toXML();
  res.header('Content-Type', 'application/xml; charset=UTF-8');
  res.send(estimatorOutput);
});

router.get('/logs', (req, res) => {
  fs.readFile(`./logs/request-response/${getLogDate()}.txt`, (err, data) => {
    if (err && err.code !== 'ENOENT') throw err;
    res.send(data);
  });
});

module.exports = router;
