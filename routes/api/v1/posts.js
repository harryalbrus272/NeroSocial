const express = require('express');
//fetching the existing instance of express in above line
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api');
router.get('/', postsApi.index);
module.exports = router;