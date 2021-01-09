const express = require('express');
//fetching the existing instance of express in above line

const router  = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router loaded');

router.get('/', homeController.home);
router.get('/actionbar', homeController.actionBar);
router.use('/users',require('./users'));
router.use('/messenger',require('./messenger'));
router.use('/channel',require('./channels'));
module.exports = router;