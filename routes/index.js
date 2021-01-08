const express = require('express');
//fetching the existing instance of express in above line

const router  = express.Router();
const homeController = require('../controllers/home_controller');
const aBar = require('../controllers/home_controller');
console.log('router loaded');

router.get('/', homeController.home);
router.get('/actionbar', aBar.actionBar)
module.exports = router;