'use strict';

const _ = require('lodash');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
  }
}

class NonUniqueIdError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NonUniqueId';
  }
}

/**
 * MemoryDB is an in-memory database used for temporary data storage. When the app is stopped, the data will be lost.
 */
class MemoryDB {
  constructor() {
    this.data = [];
  }

  /**
   * Create a new record in the database.
   *
   * @param values {Object} map of keys and values to store; id, created & updated timestamps will be added if not set
   * @returns {Object} copy of the newly created record
   *
   * @throws {NonUniqueIdError} if values.id is set and a record with that id already exists
   */
  create(values) {
    const currentTimestamp = Date.now();
    const model = Object.assign({}, {
      id: this.nextId(),
      created: currentTimestamp,
      updated: currentTimestamp
    }, values);

    if (_.find(this.data, { id: model.id })) {
      throw new NonUniqueIdError(`Record ID ${model.id} already exists.`);
    }

    this.data.push(model);

    return _.clone(model);
  }

  /**
   * Find all records with properties matching the given params.
   *
   * If params is a function, it will be run once for each record and those that evaluate truthy will be returned.
   *
   * @param params {Object|Function} map of keys and values to search for, or a predicate function
   * @returns {Array} collection of matching records, or an empty array
   */
  filter(params) {
    const records = _.filter(this.data, params);
    const models = [];

    // Copy each record into models array
    _.forEach(records, (record) => {
      models.push(_.clone(record));
    });

    return _.compact(models);
  }

  /**
   * Find the first record with properties matching the given params.
   *
   * If params is a function, it will be run once for each record and those that evaluate truthy will be returned.
   *
   * @param params {Object|Function} map of keys and values to search for, or a predicate function
   * @returns {Object} copy of the first record matching the given params
   *
   * @throws {NotFoundError} if no matching record exists
   */
  find(params) {
    const record = _.find(this.data, params);

    if (!record) {
      throw new NotFoundError(`No matching record found.`);
    }

    return _.clone(record);
  }

  /**
   * Get a single record by ID.
   *
   * @param id {Number} id of the desired record
   * @returns {Object} copy of the desired record
   *
   * @throws {NotFoundError} if no record exists with the requested id
   */
  get(id) {
    const record = _.find(this.data, { id: id });

    if (!record) {
      throw new NotFoundError(`Record ID ${id} not found.`);
    }

    return _.clone(record);
  }

  /**
   * Get the next unique record ID available.
   *
   * @returns {number}
   */
  nextId() {
    return this.data.length + 1;
  }

  /**
   * Remove a single record by ID.
   *
   * @param id {Number} id of the desired record
   * @returns {boolean} true if the record was successfully deleted, otherwise false
   *
   * @throws {NotFoundError} if no record exists with the requested id
   */
  remove(id) {
    const record = _.find(this.data, { id: id });
    const index = this.data.indexOf(record);

    if (!record) {
      throw new NotFoundError(`Record ID ${id} not found.`);
    }

    // Replace record with null value
    this.data.splice(index, 1, null);

    return this.data[index] === null;
  }

  /**
   * Update a single record by ID.
   *
   * @param id {Number} id of the desired record
   * @param values {Object} map of keys and values to update; an updated timestamp will be added if not set
   * @returns {Object} copy of the updated record
   *
   * @throws {NotFoundError} if no record exists with the requested id
   */
  update(id, values) {
    const record = _.find(this.data, { id: id });

    if (!record) {
      throw new NotFoundError(`Record ID ${id} not found.`);
    }

    const currentTimestamp = Date.now();
    const index = this.data.indexOf(record);
    const model = Object.assign({}, record, { updated: currentTimestamp }, values);

    this.data.splice(index, 1, model);

    return _.clone(model);
  }
}

module.exports = MemoryDB;
