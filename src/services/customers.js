'use strict';

const Promise = require('bluebird');

function _dbPromise(ctx, method, ...args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let result = ctx.db.customers[method](...args);
        resolve(result);
      }
      catch (err) {
        reject(err);
      }
    }, ctx.randomLatency());
  });
}

function create(ctx, attrs) {
  return _dbPromise(ctx, 'create', attrs);
}

function get(ctx, id) {
  return _dbPromise(ctx, 'get', id);
}

function filter(ctx, params) {
  return _dbPromise(ctx, 'filter', params);
}

function find(ctx, params) {
  return _dbPromise(ctx, 'find', params);
}

function remove(ctx, id) {
  return _dbPromise(ctx, 'remove', id);
}

function update(ctx, id, attrs) {
  return _dbPromise(ctx, 'update', id, attrs);
}

module.exports = {
  create,
  get,
  filter,
  find,
  remove,
  update
};
