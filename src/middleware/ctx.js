'use strict';

const db = require('../database/memoryDB');

const MIN_LATENCY = 100;
const MAX_LATENCY = 1000;

module.exports = (req, res, next) => {
  res.locals.ctx = {
    db: db,
    randomLatency: () => Math.floor(Math.random() * (MAX_LATENCY - MIN_LATENCY)) + MIN_LATENCY
  };

  next();
};
