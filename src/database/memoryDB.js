'use strict';

const MemoryDB = require('../lib/MemoryDB');

const db = {
  customers: new MemoryDB()
};

module.exports = db;
