'use strict';

const express = require('express');
const ctx = require('./middleware/ctx');
const metrics = require('node-monitor-ui');
const v1 = require('./routers/v1');
const v2 = require('./routers/v2');

const app = express();
const metricsPort = process.env.METRICS_PORT || 8021;

metrics.init(metricsPort);

/**
 * Metrics Hook
 */
app.use((req, res, next) => {
  let hook = new metrics.Hooks(req.method, req.path);
  res.locals.done = hook.end;
  next();
});

/**
 * Middleware & Routers
 */
app.use(ctx);
app.use('/v1', v1);
app.use('/v2', v2);

/**
 * Handle Success
 */
v1.use((req, res, next) => {
  res.locals.done();
  res.json(res.locals.result);
});

/**
 * Handle Error
 */
v1.use((err, req, res, next) => {
  res.locals.done();
  console.log(err);

  switch(err.name) {
    case 'NotFound':
      return res.sendStatus(404);

    case 'NonUniqueId':
      return res.sendStatus(400);

    default:
      return res.sendStatus(500);
  }
});

module.exports = app;
