'use strict';

const app = require('./src/app');

const port = process.env.PORT || 8020;

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
