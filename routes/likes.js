const express = require('express');
//fetching the existing instance of express in above line

const router  = express.Router();
const likesController = require('../controllers/likes_controller');
router.postt('/toggle',likesController.toggleLike);
module.exports = router;