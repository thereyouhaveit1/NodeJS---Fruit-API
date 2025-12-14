const express = require('express');
const router = express.Router();
const mongo = require('./db/index.js');

// GET /history endpoints
router.get('/', async (req, res) => {
  
    //requesting query from the user
    const searchTerm = req.query.searchTerm;

    //calling the find function in our index.js file which calls to our MongoDB for the users query or for the full history on Mongo DB
    const results = await mongo.find('History',searchTerm);
 
    //responding with the results in JSON 
    res.json(results);

});
//exporting our module
module.exports = router;