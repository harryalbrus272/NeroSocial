const express = require('express');
//fetching the existing instance of express in above line

const router  = express.Router();
const likesController = require('../controllers/likes_controller');
router.post('/toggle',likesController.toggleLike);
module.exports = router;