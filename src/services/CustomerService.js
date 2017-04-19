'use strict';

const Promise = require('bluebird');

/**
 * This is a service that can be instantiated and used to fetch and create customers.
 */
class CustomerService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  _dbPromise(method, ...args) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = this.ctx.db.customers[method](...args);
          resolve(result);
        }
        catch (err) {
          reject(err);
        }
      }, this.ctx.randomLatency());
    });
  }

  create(attrs) {
    return this._dbPromise('create', attrs);
  }

  get(id) {
    return this._dbPromise('get', id);
  }

  filter(params) {
    return this._dbPromise('filter', params);
  }

  find(params) {
    return this._dbPromise('find', params);
  }

  remove(id) {
    return this._dbPromise('remove', id);
  }

  update(id, attrs) {
    return this._dbPromise('update', id, attrs);
  }
}

module.exports = CustomerService;
