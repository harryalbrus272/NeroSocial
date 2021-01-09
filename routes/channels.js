const express = require('express');
const router = express.Router();
const channelsController = require('../controllers/channels_controller');
router.get('/groups', channelsController.channel);
module.exports = router;