const express = require('express');
const cors = require('cors');

const routes = require('./src/routes');
const requestLogger = require('./src/logger');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);

routes(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* eslint-disable-next-line */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port);
}

/* eslint-disable-next-line */
console.log("app running on port ", port);

// module.exports = app;
