'use strict';

const bodyParser = require('body-parser');
const CustomerService = require('../services/CustomerService');
const express = require('express');

const v2 = express.Router();

v2.use(bodyParser.json());

/**
 * Create
 */
v2.post('/customers', (req, res, next) => {
  let customerService = new CustomerService(req.ctx);
  let attrs = req.body;

  delete attrs.id;

  customerService.create(attrs)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

/**
 * Search
 */
v2.get('/customers', (req, res, next) => {
  let customerService = new CustomerService(req.ctx);
  let params = req.query;

  customerService.filter(params)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

/**
 * Get
 */
v2.get('/customers/:id', (req, res, next) => {
  let customerService = new CustomerService(req.ctx);
  let id = Number(req.params.id);

  customerService.get(id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

/**
 * Update
 */
v2.put('/customers/:id', (req, res, next) => {
  let customerService = new CustomerService(req.ctx);
  let attrs = req.body;
  let id = Number(req.params.id);

  customerService.update(id, attrs)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

/**
 * Delete
 */
v2.delete('/customers/:id', (req, res, next) => {
  let customerService = new CustomerService(req.ctx);
  let id = Number(req.params.id);

  customerService.remove(id)
    .then((result) => res.sendStatus(204))
    .catch((err) => next(err));
});

/**
 * Handle Error
 */
v2.use((err, req, res, next) => {
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

module.exports = v2;
