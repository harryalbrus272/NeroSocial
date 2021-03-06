const express = require('express');
//fetching the existing instance of express in above line
const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

module.exports = router;