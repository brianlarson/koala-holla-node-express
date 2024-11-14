const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req, res) => {
  console.log("/koala GET request received…");
});

// POST


// PUT


// DELETE

module.exports = koalaRouter;