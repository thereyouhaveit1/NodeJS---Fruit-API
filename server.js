const express = require('express');
const path = require('path');

const app = express();
const port = 8888;


// require in out database functionality
const mongo = require('./statelessServerModule/db');

// require in the exported router from poker.js
const search = require('./statelessServerModule/search.js');
app.use('/search', search);
const history = require('./statelessServerModule/history.js');
app.use('/history', history);

// require in the exported router from results.js
const results = require('./statelessServerModule/results.js');
app.use('/results', results);

// middleware function to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Error: Not Found');
});

// start the server
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});