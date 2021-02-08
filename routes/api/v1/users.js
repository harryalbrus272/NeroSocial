const express = require('express');
//fetching the existing instance of express in above line
const router = express.Router();
const userApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session', userApi.createSession);

module.exports = router;