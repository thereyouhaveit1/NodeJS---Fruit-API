const express = require('express');
const router = express.Router();
const history = require('./history.js');
const mongo = require('./db/index.js');

// import your custom node module here
const api = require('../fruitMainModule/api.js');

// endpoint for searching by keyword
router.get('/', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const results = await api.getFruit(searchTerm);

  try {
    const searchHistory = await mongo.find('History', searchTerm);
 
    if (!searchHistory) {
      await mongo.save('History', {
        searchTerm: searchTerm,
        searchCount: Object.keys(results).length,
        lastSearched: new Date(),
      });
    } else {
      await mongo.update('History', searchTerm, {
        lastSearched: new Date(),
      });
    }
  } catch (error) {
    console.log(error);
  }

  // prepare the response
  const response = {
    searchTerm: searchTerm,
    results: results
  }
  res.json(response);
});

// endpoint for getting details by id
router.get('/:id/details', async (req, res) => {
  const searchTerm = req.query.id;
  const results = await api.getId(searchTerm);

  try {
    const searchHistory = await mongo.find('History', searchTerm);
    const selection = {
      searchTerm: searchTerm,
      display: results, 
    };

    if (!searchHistory) {
      await mongo.save('History', {
        searchTerm: searchTerm,
        searchCount: Object.keys(results).length,
        lastSearched: new Date(),
        selections: [selection],
      });
    } else {
      await mongo.update('History', searchTerm, {
        lastSearched: new Date(),
        $push: { selections: selection },
      });
    }
  } catch (error) {
    console.log(error);
  }

  const response = {
    searchTerm: searchTerm,
    results: results
  }
  res.json(response);
});

module.exports = router;