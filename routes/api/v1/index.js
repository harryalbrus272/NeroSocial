const express = require('express');
//fetching the existing instance of express in above line
const router = express.Router();

router.use('/posts', require('./posts'));

module.exports = router;