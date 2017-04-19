'use strict';

const bodyParser = require('body-parser');
const CustomerService = require('../services/CustomerService');
const express = require('express');

const v2 = express.Router();

v2.use(bodyParser.json());

v2.param('id', (req, res, next, id) => {
  req.params.id = Number(id);
  next();
});

/**
 * Create
 */
v2.post('/customers', (req, res, next) => {
  let customerService = new CustomerService(res.locals.ctx);
  let attrs = req.body;

  delete attrs.id;

  customerService.create(attrs)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

/**
 * Search
 */
v2.get('/customers', (req, res, next) => {
  let customerService = new CustomerService(res.locals.ctx);
  let params = req.query;

  customerService.filter(params)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

/**
 * Get
 */
v2.get('/customers/:id', (req, res, next) => {
  let customerService = new CustomerService(res.locals.ctx);
  let id = req.params.id;

  customerService.get(id)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

/**
 * Update
 */
v2.put('/customers/:id', (req, res, next) => {
  let customerService = new CustomerService(res.locals.ctx);
  let attrs = req.body;
  let id = req.params.id;

  customerService.update(id, attrs)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

/**
 * Delete
 */
v2.delete('/customers/:id', (req, res, next) => {
  let customerService = new CustomerService(res.locals.ctx);
  let id = req.params.id;

  customerService.remove(id)
    .then((result) => res.locals.result = result)
    .then(() => next())
    .catch((err) => next(err));
});

module.exports = v2;
