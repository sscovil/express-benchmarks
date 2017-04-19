'use strict';

const bodyParser = require('body-parser');
const customerService = require('../services/customers');
const express = require('express');

const v1 = express.Router();

v1.use(bodyParser.json());

v1.param('id', (req, res, next, id) => {
  req.params.id = Number(id);
  next();
});

/**
 * Create
 */
v1.post('/customers', (req, res, next) => {
  let ctx = res.locals.ctx;
  let attrs = req.body;

  delete attrs.id;

  customerService.create(ctx, attrs)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

/**
 * Search
 */
v1.get('/customers', (req, res, next) => {
  let ctx = res.locals.ctx;
  let params = req.query;

  customerService.filter(ctx, params)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

/**
 * Get
 */
v1.get('/customers/:id', (req, res, next) => {
  let ctx = res.locals.ctx;
  let id = req.params.id;

  customerService.get(ctx, id)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

/**
 * Update
 */
v1.put('/customers/:id', (req, res, next) => {
  let ctx = res.locals.ctx;
  let attrs = req.body;
  let id = req.params.id;

  customerService.update(ctx, id, attrs)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

/**
 * Delete
 */
v1.delete('/customers/:id', (req, res, next) => {
  let ctx = res.locals.ctx;
  let id = req.params.id;

  customerService.remove(ctx, id)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

module.exports = v1;
