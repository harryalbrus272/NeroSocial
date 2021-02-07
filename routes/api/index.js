const express = require('express');
//fetching the existing instance of express in above line
const router  = express.Router();

router.use('/v1', require('./v1'));
router.use('/v2', require('./v2'));

module.exports = router;