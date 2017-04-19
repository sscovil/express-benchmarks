'use strict';

const express = require('express');
const ctx = require('./middleware/ctx');
const v1 = require('./routers/v1');
const v2 = require('./routers/v2');

const app = express();

app.use(ctx);
app.use('/v1', v1);
app.use('/v2', v2);

module.exports = app;
