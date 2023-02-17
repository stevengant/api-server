'use strict';

const express = require('express');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const foodRouter = require('./routes/foodRoute');
const clothesRouter = require('./routes/clothesRoute');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(foodRouter);
app.use(clothesRouter);
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).send(message);
});

app.get('/food', validator, (req, res) => {
  const food = {name: req.query.name};
  res.status(200).json(food);
});

app.get('/clothes', validator, (req, res) => {
  const clothes = {name: req.query.name};
  res.status(200).json(clothes);
});

app.use('*', notFound);
app.use(errorHandler);

const start = () => {
  app.listen(PORT, () => console.log('SERVER IS RUNNING ON PORT:', PORT));
};

module.exports = { start, app };


