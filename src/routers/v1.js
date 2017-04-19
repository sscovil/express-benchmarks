'use strict';

const bodyParser = require('body-parser');
const customerService = require('../services/customers');
const express = require('express');

const v1 = express.Router();

v1.use(bodyParser.json());

/**
 * Create
 */
v1.post('/customers', (req, res, next) => {
  let ctx = req.ctx;
  let attrs = req.body;

  delete attrs.id;

  customerService.create(ctx, attrs)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

/**
 * Search
 */
v1.get('/customers', (req, res, next) => {
  let ctx = req.ctx;
  let params = req.query;

  customerService.filter(ctx, params)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

/**
 * Get
 */
v1.get('/customers/:id', (req, res, next) => {
  let ctx = req.ctx;
  let id = Number(req.params.id);

  customerService.get(ctx, id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

/**
 * Update
 */
v1.put('/customers/:id', (req, res, next) => {
  let ctx = req.ctx;
  let attrs = req.body;
  let id = Number(req.params.id);

  customerService.update(ctx, id, attrs)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

/**
 * Delete
 */
v1.delete('/customers/:id', (req, res, next) => {
  let ctx = req.ctx;
  let id = Number(req.params.id);

  customerService.remove(ctx, id)
    .then((result) => res.sendStatus(204))
    .catch((err) => next(err));
});

/**
 * Handle Error
 */
v1.use((err, req, res, next) => {
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

module.exports = v1;
