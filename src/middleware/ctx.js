'use strict';

const db = require('../database/memoryDB');

module.exports = (req, res, next) => {
  let min = 100;
  let max = 1000;

  if (!req.ctx) {
    req.ctx = {};
  }

  req.ctx.db = db;
  req.ctx.randomLatency = () => Math.floor(Math.random() * (max - min)) + min;

  next();
};
