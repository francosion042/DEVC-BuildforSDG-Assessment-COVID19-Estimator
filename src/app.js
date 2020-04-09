const fs = require('fs');
const express = require('express');
const cors = require('cors');
const responseTime = require('./custom-middlewares/responseTimer');
const onCovid19RouteHandler = require('./routes/v1/on-covid-19');
const constants = require('./helper/constants');

const { getLogDate } = constants;

// initialize express
const app = express();

// add middlewares
app.use(cors());
app.use(express.json());

app.get('/clearLogs', (req, res) => {
  fs.unlink(`./logs/request-response/${getLogDate()}.txt`, (err) => {
    if (err) throw err;
    res.send('Done');
  });
});

app.use(responseTime);

app.use('/', express.static('public'));

app.use('/api/v1/on-covid-19', onCovid19RouteHandler);

module.exports = app;
