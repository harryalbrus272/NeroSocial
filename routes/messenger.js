const express = require('express');
const router = express.Router();
const messengerController = require('../controllers/messenger_controller');
router.get('/chat',messengerController.chat);
module.exports = router;